document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const answers = {
    q1: "a",
    q2: "c",
    q3: "b",
    q4: "d",
    q5: "a",
    q6: "c",
    q7: "b",
    q8: "b",
    q9: "c",
    q10: "a"
  };   


  const questionDivs = document.querySelectorAll(".question");
  const keys = Object.keys(answers);
  let score = 0;
  let detailHtml = "";

  keys.forEach((q, idx) => {
    const qDiv = questionDivs[idx];
    const qText = qDiv.querySelector("p").textContent.trim();

    const correctInput = document.querySelector(`input[name="${q}"][value="${answers[q]}"]`);
    const correctText = correctInput ? correctInput.parentElement.textContent.trim() : answers[q];

    const selectedInput = document.querySelector(`input[name="${q}"]:checked`);

    if (selectedInput) {
      const selectedText = selectedInput.parentElement.textContent.trim();
      if (selectedInput.value === answers[q]) {
        score++;
        detailHtml += `
          <div class="qa">
            <p class="qtext">${qText}</p>
            <p class="user correct">Your answer: ${selectedText} ✅</p>
            <p class="correct-answer">Correct answer: ${correctText}</p>
          </div>`;
      } else {
        detailHtml += `
          <div class="qa">
            <p class="qtext">${qText}</p>
            <p class="user wrong">Your answer: ${selectedText} ❌</p>
            <p class="correct-answer">Correct answer: ${correctText}</p>
          </div>`;
      }
    } else {
      detailHtml += `
        <div class="qa">
          <p class="qtext">${qText}</p>
          <p class="user unattempted">Not attempted ⚠️</p>
          <p class="correct-answer">Correct answer: ${correctText}</p>
        </div>`;
    }
  });

  const total = keys.length;
  const percent = Math.round((score / total) * 100);
  let performance = "";
  if (percent >= 80) performance = "Excellent — great job!";
  else if (percent >= 50) performance = "Good — a little more practice and you'll ace it.";
  else performance = "Keep practicing — you'll get there!";

  document.getElementById("result").innerHTML = `
    <h2>You scored ${score} out of ${total} (${percent}%)</h2>
    <p class="performance">${performance}</p>
    ${detailHtml}
    <div style="text-align:center; margin-top:12px;">
      <button id="retakeBtn" class="retake">Retake Quiz</button>
    </div>
  `;

  document.querySelectorAll("input").forEach(i => i.disabled = true);
  const submitBtn = document.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  document.getElementById("retakeBtn").addEventListener("click", function() {
    document.querySelectorAll("input").forEach(i => { i.disabled = false; i.checked = false; });
    document.getElementById("result").innerHTML = "";
    submitBtn.disabled = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
