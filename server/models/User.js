import { Schema, model } from "mongoose";
import validator from "validator";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String,validate: [validator.isEmail, "Please Enter a valid Email"], required: true, unique: true },
    phone: {type: String},
    password: { type: String, required: true},
    coursesUnlocked: { type: Array },
    isAdmin: {type: Boolean, default: false} ,
    isVerified: {type: Boolean, default: false},
  },
  { timestamps: true }
);

export default model("User", UserSchema);