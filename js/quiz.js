export default class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.answers = {}; // { questionId: answer }
    this.finished = false;
  }

  saveAnswer(questionId, answer) {
    if (!this.finished) {
      this.answers[questionId] = answer;
    }
  }

  reset() {
    this.answers = {};
    this.finished = false;
  }

  calculateScore() {
    let score = 0;
    this.questions.forEach((q) => {
      if (q.isCorrect(this.answers[q.id])) {
        score++;
      }
    });
    return score;
  }

  getResult() {
    const score = this.calculateScore();
    const total = this.questions.length;
    const percentage = (score / total) * 100;
    const passed = percentage >= 70;
    return { score, total, percentage, passed };
  }

  finish() {
    this.finished = true;
  }
}
