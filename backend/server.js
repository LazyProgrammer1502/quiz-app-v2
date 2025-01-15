const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRouter = require("./routes/QuestionMoelRoute");
const quizRouter = require("./routes/QuizModelRoute");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((error) => console.log("MongoDB connection failed:", error.message));

app.get("/", (req, res) => {
  res.send("Hello from backend");
});
app.use("/question", questionRouter);
app.use("/quizes", quizRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
