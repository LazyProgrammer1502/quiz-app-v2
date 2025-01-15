import "./App.css";
import { Route, Routes } from "react-router-dom";
import QuizList from "./components/QuizList";
import QuizForm from "./components/QuizForm";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/createquiz" element={<QuizForm />} />
        <Route path="/question-form/:quizId" element={<QuestionForm />} />
        <Route path="/question/:id" element={<QuestionList />} />
      </Routes>
    </div>
  );
}

export default App;
