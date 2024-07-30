import Order from "../models/Order.js";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";
import express from "express"
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

const parseProductString = (productString) => {
  const productParts = productString.split('|').map(part => part.trim());
  const productObject = {};

  productParts.forEach(part => {
    const [key, value] = part.split(':').map(part => part.trim());
    productObject[key.toLowerCase()] = value;
  });

  return productObject;
};

//CREATE

router.post("/", verifyToken, async (req, res) => {
  //const newOrder = new Order(req.body);

  //console.log("open");

  const { productlist, orderId, amount, userEmail, address } = req.body;

  const transformedProducts = Object.values(productlist).map(productString => {
    const product = parseProductString(productString);
    return {
      productId: product.id,
      quantity: parseInt(product.quantity, 10),
      price: parseFloat(product.price),
    };
  });

  try {

    // Check stock for each product
    const outOfStockProducts = [];
    for (const item of transformedProducts) {
      const product = await Product.findById(item.productId);
      if (product.stockNo < item.quantity) {
        outOfStockProducts.push({
          productName: product.title,
          requestedQuantity: item.quantity,
          availableStock: product.stockNo,
        });
      }
    }

    if (outOfStockProducts.length > 0) {
      return res.status(400).json({
        message: 'Some products are out of stock',
        outOfStockProducts,
      });
    }

    // Delete all pending orders for the given userEmail
    const deleteResult = await Order.deleteMany({ userEmail: userEmail, status: "pending" });
    // console.log(`Deleted ${deleteResult.deletedCount} pending orders`);

    const savedOrder = await Order.create({
      userEmail: userEmail,  
      orderId: orderId,      
      products: transformedProducts,
      amount: parseFloat(amount), 
      address: address,
      status: "pending"
    });

    for (const item of savedOrder.products) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stockNo: -item.quantity } }
      );
    }

    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete-pending-order-after-razorpay-window-close
router.post("/delete-pending-order", verifyToken, async (req, res) => {
  const { orderId } = req.body;
  
  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId: orderId, status: 'pending' });
    
    if (deletedOrder) {
      // Restock the products if the order was found and deleted
      for (const item of deletedOrder.products) {
        await Product.updateOne(
          { _id: item.productId },
          { $inc: { stockNo: item.quantity } }
        );
      }
      res.status(200).json({ message: 'Pending order deleted and products restocked' });
    } else {
      res.status(404).json({ message: 'Order not found or already processed' });
    }
  } catch (error) {
    console.error('Error deleting pending order:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const {email} = user._doc;
    const orders = await Order.find({ userEmail: email });//check
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;