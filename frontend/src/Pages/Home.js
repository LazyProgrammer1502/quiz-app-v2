import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/quizes");
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuizes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizes();
  }, []);

  if (loading) {
    return <div>Loading quizzes...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="Body">
      <header>
        <p>Well Come To Our Quiz Home</p>
      </header>
      <div className="quiz__div">
        {quizes.map((quiz) => (
          <div className="quiz__card">
            <h3 className="quiz__topic" key={quiz._id}>
              {quiz.title}
            </h3>
            <p className="quiz__description">{quiz.description}</p>
            <Link to={`/quizes/${quiz._id}`}>
              <button>Start Quiz</button>
            </Link>
          </div>
        ))}
      </div>
      <footer>Made with {"\u2665"} by Lazy Programmer</footer>
    </div>
  );
}

export default Home;
