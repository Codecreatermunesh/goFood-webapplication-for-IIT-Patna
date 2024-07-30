import express from "express";
import { instance } from "../index.js";
import crypto from "crypto";
import  Payment  from "../models/Payment.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// import {
//   checkout,
//   paymentVerification,
// } from "../controllers/paymentController.js";

const router = express.Router();

//place order

router.post("/checkout", async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
  
    try {
        const order = await instance.orders.create(options);
  
        res.status(200).json({
          success: true,
          order,
        });
    } catch (err) {
      res.status(500).json(err);
    }
});

// router.route("/paymentverification").post(paymentVerification);

router.post("/paymentverification", async (req, res) => {
    // console.log(req.body);

    // res.status(200).json({success:true,});
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {

      
      const paymentDetails = await instance.payments.fetch(razorpay_payment_id);
      const pref = paymentDetails;

      // const user_email = paymentDetails.prefill.email;
      const amount = paymentDetails.amount;
      const order_mongoid = paymentDetails.notes.order_mongoid;
      const user_email = paymentDetails.email;


      // // Extract all categories from productlist
      // const categoriesArray = Object.values(productlist).flatMap(productString => {
      //   const product = parseProductString(productString);
      //   return product.categories;
      // });

      // // Flatten and make unique using Set
      // const uniqueCategories = [...new Set(categoriesArray.flatMap(categories => categories))];

      const body = razorpay_order_id + "|" + razorpay_payment_id;
    
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");
    
      const isAuthentic = expectedSignature === razorpay_signature;

      
    
      if (isAuthentic) {
        // Database comes here
    
        await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });

        await Order.findOneAndUpdate(
          { orderId: razorpay_order_id  },
          {$set: { status: "paid", referenceId: razorpay_payment_id } },
          { new: true, useFindAndModify: false }
        );

        // Fetch the order from the database
        const order = await Order.findOne({ orderId : razorpay_order_id });

        // Update user coursesUnlocked based on the order's products
        const productIds = order.products.map(product => product.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        // Get unique categories from all products in the order
        let categoriesToAdd = new Set();
        products.forEach(product => {
          product.categories.forEach(category => {
            categoriesToAdd.add(category);
          });
        });

        categoriesToAdd = Array.from(categoriesToAdd); // Convert Set to Array

        // Update the user's coursesUnlocked array with new categories
        const updatedUser = await User.findOneAndUpdate(
          { email: order.userEmail },
          { $addToSet: { coursesUnlocked: { $each: categoriesToAdd } } },
          { new: true }
        );
    
        res.redirect(
          `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
      } else {
        console.log(productlist);
        console.log(user_email);
        console.log(pref);
        res.status(400).json({
          success: false,
        });
      }
      // const metadata = paymentDetails.notes;
      // res.json({ success: true, metadata });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }    
    
});


router.get("/cancel", (req, res) => {
  
  res.status(400).json({
    success: false,
  });
  
  
});



export default router;


// export const checkout = async (req, res) => {
//     const options = {
//       amount: Number(req.body.amount * 100),
//       currency: "INR",
//     };
//     const order = await instance.orders.create(options);
  
//     res.status(200).json({
//       success: true,
//       order,
//     });
// };

// export const paymentVerification = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
  
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
  
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//       .update(body.toString())
//       .digest("hex");
  
//     const isAuthentic = expectedSignature === razorpay_signature;
  
//     if (isAuthentic) {
//       // Database comes here
  
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });
  
//       res.redirect(
//         `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//       );
//     } else {
//       res.status(400).json({
//         success: false,
//       });
//     }
//   };