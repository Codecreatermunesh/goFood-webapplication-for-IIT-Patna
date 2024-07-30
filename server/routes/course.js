import express from 'express';
import Course from '../models/Course.js';
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js';

const router = express.Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCourse = new Course(req.body);

  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("Course has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET COURSE
router.get("/find/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL COURSES
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let courses;

    if (qNew) {
      courses = await Course.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      courses = await Course.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      courses = await Course.find();
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;