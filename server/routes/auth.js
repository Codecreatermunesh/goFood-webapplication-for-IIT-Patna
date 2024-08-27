import express from 'express'
import User from '../models/User.js'
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import SendmailTransport from 'nodemailer/lib/sendmail-transport/index.js';
// import { config } from "dotenv";
// config();
const router = express.Router();


// SEND MAIL
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerifyMail = async (name, email, userid) => {
  try {
    const msg = {
      to: email,
      from: 'your-email@example.com', // Use the email address or domain you verified with SendGrid
      subject: 'Verify Account',
      html: `<p>Hi ${name}, click <a href='https://gofood-hp8t.onrender.com/api/auth/verify?id=${userid}'>here</a> to verify your account.</p>`,
    };

    await sgMail.send(msg);
    console.log("Email has been sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    isVerified: true, // Ensure isVerified field exists in User model schema
  });

  try {
    const savedUser = await newUser.save();
    // if (savedUser) {
    //   await sendVerifyMail(savedUser.username, savedUser.email, savedUser._id);
    // }
    return res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error registering user:", err);
    if (savedUser) await User.findOneAndDelete({email: req.body.email});
    return res.status(500).json({ message: "Error registering user", error: err });
  }
});

// VERIFY
router.get("/verify", async (req, res) => {
  try {
    const verifiedUser = await User.updateOne({ _id: req.query.id }, { $set: { isVerified: true }} , { new: true });
    if (verifiedUser.nModified === 1) {
      return res.status(200).json({ message: "Account verified successfully" }).render("email-verify");
    } else {
      return res.status(400).json({ message: "Verification failed. User not found or already verified." });
    }
  } catch (err) {
    console.error("Error verifying user:", err);
    return res.status(500).json({ message: "Error verifying user", error: err });
  }
});

//LOGIN

router.post("/login", async(req,res)=>{
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
    const oPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (oPassword!==req.body.password) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );

    const { password, ...others } = user._doc;  

    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure:true,
      sameSite: 'none',
    };

    res.status(200).cookie("token", accessToken, options).json({
      ...others,
      accessToken,
    });  


  }catch (err) {
    return res.status(500).json(err);
  }
});


export default router
