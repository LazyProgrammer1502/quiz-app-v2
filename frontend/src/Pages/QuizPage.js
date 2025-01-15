import React, { useState, useEffect } from "react";
import "./QuizPage.css";
import { useParams, useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";

function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0); // Add score state

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/quizes/${quizId}`);
        if (!response.ok) {
          throw new Error(
            `HTTP error ${response.status}: ${response.statusText}`
          );
        }
        const data = await response.json();
        setQuizData(data);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerSelect = (optionText) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: optionText });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    if (quizData && quizData.questions) {
      quizData.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
          calculatedScore += question.marks || 1; // Add question marks or 1 if marks not defined
        }
      });
    }
    setScore(calculatedScore);
    setQuizFinished(true);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("You switched tabs. The quiz will be submitted automatically.");
        handleSubmitQuiz();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="body">
        <div className="no__questions">loading</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="body">
        <div className="no__questions">No questions found for this quiz.</div>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <ResultPage
        score={score}
        totalQuestions={quizData.questions.length}
        quizTitle={quizData.title}
      />
    );
    navigate("/result");
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="main__div">
      <div className="quiz__header">
        <h2 className="quiz__title">{quizData.title}</h2>
        <p className="quiz__description">{quizData.description}</p>
      </div>
      <div className="quiz__body">
        <h3 className="quiz__question">
          Question {currentQuestionIndex + 1}: {currentQuestion.text}
        </h3>
        <ul className="option__table">
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={option.text}
                  checked={userAnswers[currentQuestionIndex] === option.text}
                  onChange={() => handleAnswerSelect(option.text)}
                />
                {option.text}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="quiz__buttons">
        <button
          onClick={handleNextQuestion}
          disabled={!userAnswers[currentQuestionIndex]}
          hidden={currentQuestionIndex === quizData.questions.length - 1}
        >
          Next Question
        </button>
        {currentQuestionIndex === quizData.questions.length - 1 && (
          <button
            disabled={!userAnswers[currentQuestionIndex]}
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
