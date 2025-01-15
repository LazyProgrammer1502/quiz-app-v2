import React from "react";
import "./ResultPage.css";

function ResultPage({ score, totalQuestions, quizTitle }) {
  return (
    <div className="main__result">
      <div className="result__div">
        <h2>{quizTitle} Finished!</h2>
        <p>
          Your score: {score}/{totalQuestions}
        </p>
      </div>
    </div>
  );
}

export default ResultPage;
