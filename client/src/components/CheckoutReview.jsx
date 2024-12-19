import React from 'react'
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { publicRequest } from '../requestMethods';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contain = styled.div`
  
  border: 0.5px solid lightgray;
  border-radius: 10px;
  
  padding: 10px
  
  
`;

const Info = styled.div`
  flex: 3;
  
  margin: 0 30px
  
`;


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  padding: 10px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 75px;
  
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Button = styled.button`
  width: 100%;
  padding: 10px ;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const CheckoutReview = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart); 
  const user = useSelector((state) => state.user.currentUser);
  let userEmail = null;
  if (user) userEmail = user.email;
  // console.log(userEmail);

  const handleCheckout = () => {
    if (user) {
      checkoutHandler();
    } else {
      navigate('/login');
    }
  };
  

  const checkoutHandler = async () => {

    try {
      const { data: { key } } = await publicRequest.get("/payment/getkey");
      const { data: { order } } = await publicRequest.post("/payment/checkout", {amount:`${cart.total}`});

      const productlist = cart.products.reduce((acc, obj, index) => {
        acc[`product_${index + 1}`] = `ID: ${obj._id}| Title: ${obj.title}| Categories: ${obj.categories.join(', ')}| Price: ${obj.price}| Quantity: ${obj.quantity}`;
        return acc;
      }, {});
      
      // saving new order
      const address = "sample address";
      const res = await publicRequest.post("/orders", {
        productlist, // List of products
        orderId: order.id,
        amount: order.amount,
        userEmail,
        address,
      }, { withCredentials: true });
      console.log('Order details sent successfully:', res.data);
      
      if (res.data){
        const options = {
          key: key,
          amount: order.amount,
          currency: "INR",
          name: "Munesh",
          description: "Tutorial of RazorPay",
          image: "",//image
          order_id: order.id,
          callback_url: "https://gofood-hp8t.onrender.com/api/payment/paymentverification",
          prefill: {
              name: "Munesh Meena",
              email: userEmail,
              contact: "9999999999"
          },
          
          notes: {
            address : address,
            order_mongoid : res.data._id,
          },
          
          theme: {
              "color": "#121212"
          },
          modal: {
            ondismiss: function () {
              // Razorpay checkout modal was dismissed
              publicRequest.post('/orders/delete-pending-order', { orderId : order.id },{ withCredentials: true })
                .then(response => {
                  console.log('Pending order deleted successfully', response);
                })
                .catch(error => {
                  console.error('Failed to delete pending order', error);
                });
            }
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      }else {
        console.log("error");
      }

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.outOfStockProducts) {
        const outOfStockMessage = error.response.data.outOfStockProducts.map(product => 
          `Product Name: ${product.productName}, Requested Quantity: ${product.requestedQuantity}, Available Stock: ${product.availableStock}`
        ).join('\n');
        alert(`Some products are out of stock:\n${outOfStockMessage}`);
        return;
      } else {
        console.error("Error during order creation:", error);
        return;
      }
    }

  };


  const makePayment = async () => {
    try {
        const { data: { key } } = await publicRequest.get("/payment/getkey");
        const { data: { order } } = await publicRequest.post("/payment/checkout", {amount:`${cart.total}`});

        const payload = {
            key_id: key,
            amount: order.amount,
            order_id: order.id,
            name: 'Acme Corp',
            description: 'A Wild Sheep Chase',
            image: 'https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.jpg',
            'prefill[name]': 'Gaurav Kumar',
            'prefill[contact]': '9123456780',
            'prefill[email]': 'gaurav.kumar@example.com',
            'notes[shipping address]': 'L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001',
            callback_url: "https://gofood-hp8t.onrender.com/api/payment/paymentverification",
            cancel_url: "https://gofood-hp8t.onrender.com/api/payment/cancel"
        };

        // Make the POST request through dynamic form
        const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://api.razorpay.com/v1/checkout/embedded';

            // Add hidden input fields
            for (const key in payload) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = payload[key];
                form.appendChild(input);
            }

            // Append the form to the body and submit it
            document.body.appendChild(form);
            form.submit();
    } catch (error) {
        console.error('Error during payment:', error);
        // Handle other errors (e.g., network issues)
    }
  };



  return (
    <Contain>
      <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>Qty:</b> {product.quantity}
                      </ProductId>
                      <ProductId>
                        <b>Price:</b> {product.price * product.quantity}
                      </ProductId>
                      
                    </Details>
                  </ProductDetail>
                  
                </Product>
                
              ))}
              
      </Info>
      <b>Total:</b> {cart.total}
      <Button onClick={handleCheckout}>PROCEED TO PAY</Button>

      <Button onClick={makePayment}>Make Payment</Button>
      

    </Contain>
  )
}

export default CheckoutReview
