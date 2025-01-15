import React, { useEffect, useState } from "react";
import "./QuizList.css";
import { Link } from "react-router-dom";
function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);

  //Fetch Quizzes

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:5000/quizes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  // Delete Quiz

  const handleDelete = async (quizId) => {
    try {
      const response = await fetch(`http://localhost:5000/quizes/${quizId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedQuizzes = quizzes.filter((quiz) => quiz._id !== quizId);
      setQuizzes(updatedQuizzes);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  //Edit Quiz

  const handleUpdateQuiz = async (quizId, newTitle, newDescription) => {
    try {
      const response = await fetch(`http://localhost:5000/quizes/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }
      const updatedQuizzes = quizzes.map((quiz) => {
        return quiz._id === quizId
          ? { ...quiz, title: newTitle, description: newDescription }
          : quiz;
      });
      setQuizzes(updatedQuizzes);
      setEditingQuizId(null);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <div className="body__div">
      <div className="quiz__header">
        <h2>Quizzes</h2>
        <Link to="/createquiz">
          <button>Add Quiz</button>
        </Link>
      </div>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            {editingQuizId === quiz._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newTitle = e.target.elements.title.vlaue;
                  const newDescription = e.target.elements.description.vlaue;
                  handleUpdateQuiz(quiz._id, newTitle, newDescription);
                }}
              >
                <input
                  className="form__input"
                  type="text"
                  name="title"
                  defaultvalue={quiz.title}
                />
                <textarea
                  name="description"
                  className="form__input"
                  rows={3}
                  defaultValue={quiz.description}
                ></textarea>
                <button type="submit">Save</button>
                <button onClick={() => setEditingQuizId(null)}>Cancel</button>
              </form>
            ) : (
              <div className="quiz__div">
                <div>
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description}</p>
                </div>
                <button onClick={() => setEditingQuizId(quiz._id)}>Edit</button>
                <button onClick={() => handleDelete(quiz._id)}>
                  Delete Quiz
                </button>
                <Link to={`/question/${quiz._id}`}>
                  <button>See Questions</button>
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
