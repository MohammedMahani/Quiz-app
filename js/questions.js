export default class Question {
  constructor(id, text, options, correctAnswer) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  isCorrect(answer) {
    return answer === this.correctAnswer;
  }
}
