import React, { useState } from "react";
import "./QuizForm.css";
import { useNavigate } from "react-router-dom";

function QuizForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/quizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, topic }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("QUIZ CREATED");
      setTitle("");
      setDescription("");
      setTopic("");
      navigate("/");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };
  return (
    <div className="body__div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="question__input"
        />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic"
          className="question__input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="question__input"
          rows={5}
        ></textarea>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}

export default QuizForm;
