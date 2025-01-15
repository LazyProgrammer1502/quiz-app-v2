const router = require("express").Router();
const Quiz = require("../models/QuizModel");
const Question = require("../models/QuestionModel");

// post Quizes

router.route("/").post(async (req, res) => {
  try {
    const { title, topic, description } = req.body;
    const newQuiz = new Quiz({ title, topic, description });
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz); // Return the created quiz
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Get Quizes

router.route("/").get(async (req, res) => {
  try {
    const quizzes = await Quiz.find(); // Populate questions
    res.json(quizzes);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Get Quize by Id

router.route("/:id").get(async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    await quiz.populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Update a Quiz

router.route("/:id").put(async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//Delete a Quiz

router.route("/:id").delete(async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    await Question.deleteMany({ quiz: req.params.id });

    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
