import { Schema, model } from 'mongoose';

const CourseSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String }
  },
  { timestamps: true }
);

export default model('Course', CourseSchema);