import React, { useState } from "react";
import "./QuestionForm.css";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";

function QuestionForm() {
  const { quizId } = useParams();
  const [text, setText] = useState("");
  const [options, setOptions] = useState([
    { id: uuidv4(), text: "" },
    { id: uuidv4(), text: "" },
    { id: uuidv4(), text: "" },
    { id: uuidv4(), text: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (id, event) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.id === id) {
          return { ...option, text: event.target.value };
        } else {
          return option;
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz: quizId, text, options, correctAnswer }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      }
      console.log("Question Created");
      setText("");
      setOptions([
        { id: uuidv4(), text: "" },
        { id: uuidv4(), text: "" },
        { id: uuidv4(), text: "" },
        { id: uuidv4(), text: "" },
      ]);
      setCorrectAnswer("");
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <div className="body__div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value, e)}
          placeholder="Enter Question Here...."
          required
          className="question__input"
        />
        <div className="option__div">
          <input
            type="text"
            value={options[0].text}
            onChange={(e) => handleOptionChange(options[0].id, e)}
            placeholder="Option 1"
            required
          />
          <input
            type="radio"
            name="correctAnswer"
            value={options[0].text}
            checked={correctAnswer === options[0].text}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
        <div className="option__div">
          <input
            type="text"
            value={options[1].text}
            onChange={(e) => handleOptionChange(options[1].id, e)}
            placeholder="Option 2"
            required
          />
          <input
            type="radio"
            name="correctAnswer"
            value={options[1].text}
            checked={correctAnswer === options[1].text}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
        <div className="option__div">
          <input
            type="text"
            value={options[2].text}
            onChange={(e) => handleOptionChange(options[2].id, e)}
            placeholder="Option 3"
            required
          />
          <input
            type="radio"
            name="correctAnswer"
            value={options[2].text}
            checked={correctAnswer === options[2].text}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
        <div className="option__div">
          <input
            type="text"
            value={options[3].text}
            onChange={(e) => handleOptionChange(options[3].id, e)}
            placeholder="Option 4"
            required
          />
          <input
            type="radio"
            name="correctAnswer"
            value={options[3].text}
            checked={correctAnswer === options[3].text}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>

        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}

export default QuestionForm;
