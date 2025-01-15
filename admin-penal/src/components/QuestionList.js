import React, { useState, useEffect } from "react";
import "./QuestionList.css";
import { useParams, Link } from "react-router-dom";

function QuestionList() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const response = await fetch(`http://localhost:5000/quizes/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            // Special handling for 404 (Quiz Not Found)
            setError({ message: "Quiz not found." });
          } else {
            const errorText = await response.text();
            throw new Error(
              `HTTP error ${response.status}: ${
                errorText || response.statusText
              }`
            );
          }
          return; // Important: Exit the function early if there's an error
        }
        const quizData = await response.json();
        setQuiz(quizData);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError({ message: "Failed to fetch quiz." }); // Generic error message
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return <div>Loading quiz details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>; // This is now redundant but good to keep
  }

  //Delete Question

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/question/${questionId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      setQuiz((prevQuiz) => {
        if (prevQuiz && prevQuiz.questions) {
          // Check if prevQuiz and prevQuiz.questions exist
          return {
            ...prevQuiz,
            questions: prevQuiz.questions.filter(
              (question) => question._id !== questionId
            ),
          };
        }
        return prevQuiz; // If prevQuiz is null, return it without trying to update
      });
      console.log("Question Deleted successfully");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="body__div">
      {/* ADD QUESTION */}
      <div className="header__questions">
        <h2>{quiz.title}</h2>
        <Link to={`/question-form/${quiz._id}`}>
          <button>ADD QUESTION</button>
        </Link>
      </div>
      {/* fetch questions */}
      <h3>Questions:</h3>
      {quiz.questions.length === 0 ? ( //Handle case if there are no questions for the quiz
        <p>No questions added yet.</p>
      ) : (
        <ul className="questions__ul">
          {quiz.questions.map((question) => (
            <li key={question._id} className="questions__li">
              <p>
                <strong>{question.text}</strong>
              </p>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>
                    {option.text} {option.isCorrect && "(Correct)"}
                  </li>
                ))}
              </ul>
              <p>Correct Answer: {question.correctAnswer}</p>
              <button onClick={() => handleDeleteQuestion(question._id)}>
                Remove Question
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionList;
