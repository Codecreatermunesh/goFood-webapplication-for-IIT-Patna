//const router = require("express").Router();
import express from "express"
import User from '../models/User.js'
import CryptoJS from 'crypto-js';
//import {verifyTokenAndAuthorization} from './verifyToken.js'
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from './verifyToken.js';

const router = express.Router();

//UPDATE
router.put("/",verifyToken,async(req,res)=>{
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        return res.status(200).json(updateUser);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//UPDATE PASSWORD
router.put("/change-password", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password } = user._doc;
    const hashedPassword = CryptoJS.AES.decrypt(password, process.env.PASS_SEC);
    const oPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (req.body.currentPassword !== oPassword) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const newEncryptedPassword = CryptoJS.AES.encrypt(req.body.newPassword, process.env.PASS_SEC).toString();

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: newEncryptedPassword,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
});

//CHECK CURRENT PASSWORD WHILE UPDATING
router.post("/password-check",verifyToken,async(req,res)=>{
  
  try {
    const decryptedPassword = CryptoJS.AES.decrypt(
      req.user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (req.body.password === decryptedPassword) {
      return res.status(200).json(true);
    } else {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }

});

//DELETE
router.delete("/", verifyToken, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id); //req.params.id
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ME
router.get("/load", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", verifyToken, async (req, res) => {
  try {
    const options = {
      expires: new Date(
        Date.now()-1
      ),
      httpOnly: true,
    };

    res.status(200).cookie("token", null, options).json({
      logout:successfull
    });  
  } catch (err) {
    res.status(500).json(err);
  }
});
  
//GET USER
router.get("/finds/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//GET ALL USER
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
});


export default router