const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true }, // Quiz this question belongs to
    text: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
      },
    ], // Array of answer options
    correctAnswer: { type: String, required: true }, // Index of the correct option
    marks: { type: Number, default: 1 }, // Marks for the question
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
