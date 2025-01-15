const express = require("express");
const router = express.Router();
const Question = require("../models/QuestionModel");
const Quiz = require("../models/QuizModel");

// post question

router.route("/").post(async (req, res) => {
  try {
    const { quiz, text, options, correctAnswer, marks } = req.body;
    const newQuestion = new Question({
      quiz,
      text,
      options,
      correctAnswer,
      marks,
    });
    const savedQuestion = await newQuestion.save();
    await Quiz.findByIdAndUpdate(quiz, {
      $push: { questions: savedQuestion._id },
    });

    res.status(201).json(savedQuestion); // Success response with created question
  } catch (err) {
    console.error("Error creating question:", err); // Log the error for debugging
    res.status(400).json({ message: err._message }); // More user-friendly message
  }
});

//Get question by /:id

router.route("/:id").get(async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json("Error: " + err);
  }
});

//Update question
router.route("/:id").put(async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//Delete a question

router.route("/:id").delete(async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      res.status(404).json({ message: " Question not found" });
    }
    await Quiz.findOneAndUpdate(question.quiz, {
      $pull: { questions: req.params.id },
    });
    res.json({ message: "Question Deleted" });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
