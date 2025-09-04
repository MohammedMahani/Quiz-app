import Question from "./questions.js";
import Quiz from "./quiz.js";
import UI from "./dom.js";

// Setup questions
const questions = [
  new Question(1, "5 + 3 = ?", ["6", "7", "8"], "8"),
  new Question(2, "12 - 4 = ?", ["6", "8", "10"], "8"),
  new Question(3, "6 * 7 = ?", ["42", "36", "40"], "42"),
  new Question(4, "49 ÷ 7 = ?", ["6", "7", "8"], "7"),
  new Question(5, "The square root of 81 = ?", ["9", "8", "7"], "9"),
  new Question(6, "10² = ?", ["20", "100", "50"], "100"),
  new Question(7, "15 % 4 = ?", ["3", "2", "1"], "3"),
  new Question(8, "3³ = ?", ["9", "27", "81"], "27"),
  new Question(9, "7 + (6 * 2) = ?", ["19", "20", "21"], "19"),
  new Question(10, "100 ÷ 25 = ?", ["2", "4", "5"], "4"),
];

const quiz = new Quiz(questions);
const ui = new UI(document.getElementById("questions"));

const resultContainer = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

const STORAGE_KEY = "quiz-progress";

// Restore progress if exists
const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  const { answers, finished } = JSON.parse(saved);
  quiz.answers = answers || {};
  quiz.finished = finished || false;
  if (quiz.finished) {
    quiz.reset(); // Start fresh after finishing
    localStorage.removeItem(STORAGE_KEY);
  }
}

ui.renderQuestions(quiz.questions, quiz.answers);

// Listen for option changes
document.getElementById("questions").addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const qid = parseInt(e.target.name.replace("q", ""));
    quiz.saveAnswer(qid, e.target.value);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers: quiz.answers,
        finished: quiz.finished,
      })
    );
  }
});

// Submit quiz
submitBtn.addEventListener("click", () => {
  quiz.finish();
  const result = quiz.getResult();
  ui.showResult(result, resultContainer);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      answers: quiz.answers,
      finished: quiz.finished,
    })
  );
});

// Reset quiz
resetBtn.addEventListener("click", () => {
  quiz.reset();
  ui.renderQuestions(quiz.questions);
  ui.clearResult(resultContainer);
  localStorage.removeItem(STORAGE_KEY);
});
