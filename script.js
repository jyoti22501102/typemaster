const loginBox = document.getElementById("loginBox");
const typingBox = document.getElementById("typingBox");
const endBox = document.getElementById("endBox");

const startBtn = document.getElementById("startBtn");
const usernameInput = document.getElementById("username");

const textDisplay = document.getElementById("textDisplay");
const typingArea = document.getElementById("typingArea");

const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const strengthDisplay = document.getElementById("strength");
const timerDisplay = document.getElementById("timer");

const nextBtn = document.getElementById("nextRoundBtn");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const restartBtn = document.getElementById("restartBtn");
const userNameDisplay = document.getElementById("userNameDisplay");

const keySound = document.getElementById("keySound");
const errorSound = document.getElementById("errorSound");

const keys = document.querySelectorAll(".key");

const text = "a b c d e";
let timeLeft = 60, timer;
let total = 0, correct = 0;

startBtn.onclick = () => {
  if (!usernameInput.value) return alert("Enter name");
  loginBox.classList.add("hidden");
  typingBox.classList.remove("hidden");
  userNameDisplay.textContent = usernameInput.value;
  loadText();
};

function loadText() {
  textDisplay.innerHTML = "";
  text.split("").forEach(ch => {
    const span = document.createElement("span");
    span.textContent = ch;
    textDisplay.appendChild(span);
  });
  timer = setInterval(updateTimer, 1000);
}

typingArea.addEventListener("input", () => {
  const spans = textDisplay.querySelectorAll("span");
  const typed = typingArea.value;
  total = typed.length;
  correct = 0;

  spans.forEach((span, i) => {
    if (!typed[i]) span.className = "";
    else if (typed[i] === span.textContent) {
      span.className = "correct";
      correct++;
      keySound.play();
    } else {
      span.className = "wrong";
      errorSound.play();
    }
  });

  const wpm = Math.round((correct / 5) / ((60 - timeLeft) / 60) || 0);
  const acc = total ? Math.round((correct / total) * 100) : 0;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = acc + "%";
  strengthDisplay.textContent = wpm + "%";
});

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft + "s";
  if (timeLeft <= 0) finish();
}

function finish() {
  clearInterval(timer);
  typingBox.classList.add("hidden");
  endBox.classList.remove("hidden");
  finalWpm.textContent = wpmDisplay.textContent;
  finalAccuracy.textContent = accuracyDisplay.textContent;
}

restartBtn.onclick = () => location.reload();

document.addEventListener("keydown", e => {
  keys.forEach(k => {
    if (k.dataset.key === e.key.toLowerCase())
      k.classList.add("active");
  });
});
document.addEventListener("keyup", e => {
  keys.forEach(k => k.classList.remove("active"));
});
