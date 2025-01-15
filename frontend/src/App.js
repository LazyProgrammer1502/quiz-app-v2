import React from "react";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import QuizPage from "./Pages/QuizPage";
import ResultPage from "./Pages/ResultPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizes/:quizId" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
};

export default App;
