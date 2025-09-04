export default class UI {
  constructor(container) {
    this.container = container;
  }

  renderQuestions(questions, savedAnswers = {}) {
    this.container.innerHTML = "";
    questions.forEach((q) => {
      const qDiv = document.createElement("div");
      qDiv.classList.add("question");

      const p = document.createElement("p");
      p.textContent = q.text;
      qDiv.appendChild(p);

      const optionsDiv = document.createElement("div");
      optionsDiv.classList.add("options");

      q.options.forEach((opt) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `q${q.id}`;
        input.value = opt;
        if (savedAnswers[q.id] === opt) input.checked = true;
        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        optionsDiv.appendChild(label);
      });

      qDiv.appendChild(optionsDiv);
      this.container.appendChild(qDiv);
    });
  }

  showResult(result, resultContainer) {
    resultContainer.innerHTML = `
      Score: ${result.score}/${result.total} (${result.percentage.toFixed(
      1
    )}%) - 
      ${result.passed ? "✅ Passed" : "❌ Failed"}
    `;
  }

  clearResult(resultContainer) {
    resultContainer.innerHTML = "";
  }
}
