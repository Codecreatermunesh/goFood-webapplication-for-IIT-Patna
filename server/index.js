import express, { json } from "express";
const app = express();
import { connect } from "mongoose";
import { config } from "dotenv";
//import userRoute from "./routes/user";
import authRoute from './routes/auth.js';
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import courseRoute from "./routes/course.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import Razorpay from "razorpay" ;


config();

connect(process.env.MONGO_URL)
    .then(()=> console.log("DB connection successfull"))
    .catch((err)=> {
        console.log(err);
    });
/////////////////////////////////////////////////////////

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});
/////////////////////////////////////////////////////////

app.set('view engine', 'ejs');
app.use(cors({
    origin: 'https://gofood-three.vercel.app',
    credentials: true, // Allow cookies
}));    
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/courses",courseRoute);
app.use("/api/payment", paymentRoute);

app.get("/api/payment/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server running successfully");
});
