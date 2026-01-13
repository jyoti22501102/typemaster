function login() {
  const name = document.getElementById("username").value;

  if (name.trim() === "") {
    alert("Please enter your name");
    return;
  }

  document.getElementById("user").innerText = name;
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("typingBox").classList.remove("hidden");

  restart();
}

/* ================================
   TYPING TUTOR – ALL LOGIC HERE
   Easy to edit | Beginner friendly
================================ */

// -------- LEVEL CONTENT --------

// Level 1 – Alphabets (10 rounds)
const level1 = [
  "a a a a a",
  "b b b b b",
  "c c c c c",
  "d d d d d",
  "e e e e e",
  "f f f f f",
  "g g g g g",
  "h h h h h",
  "i i i i i",
  "j j j j j"
];

// Level 2 – Words
const level2 = [
  "cat dog pen",
  "apple banana mango",
  "computer keyboard mouse",
  "javascript html css",
  "practice makes perfect",
  "learn to type fast",
  "speed and accuracy",
  "focus on the screen",
  "keep your hands steady",
  "typing improves skills"
];

// Level 3 – Sentences
const level3 = [
  "The sun rises in the east.",
  "Typing is a useful skill.",
  "Practice every day to improve.",
  "Accuracy is more important than speed.",
  "Keep your eyes on the screen.",
  "Do not look at the keyboard.",
  "Consistency brings success.",
  "Technology improves productivity.",
  "Learning never stops.",
  "Hard work beats talent."
];

// Level 4 – Paragraphs
const level4 = [
  "Typing speed is an essential skill in the digital age. Regular practice improves accuracy.",
  "Technology has changed the way we work and learn. Typing efficiently saves time.",
  "Discipline and dedication help master any skill. Typing is no exception.",
  "Focus on accuracy before increasing speed to become a better typist."
];

// Level 5 – Poems & Stories
const level5 = [
  "Twinkle twinkle little star how I wonder what you are.",
  "Roses are red violets are blue typing is fun and learning too.",
  "Once upon a time there lived a student who practiced typing daily."
];

// -------- LEVEL CONTROLLER --------

const levels = [level1, level2, level3, level4, level5];

let currentLevel = 0;
let currentRound = 0;
let timeLeft = 45;
let timer;

// -------- ELEMENTS --------

const textToType = document.getElementById("textToType");
const typingArea = document.getElementById("typingArea");
const timeEl = document.getElementById("time");
const levelInfo = document.getElementById("levelInfo");

// -------- FUNCTIONS --------

function loadRound() {
  textToType.innerText = levels[currentLevel][currentRound];
  levelInfo.innerText = `Level ${currentLevel + 1} - Round ${currentRound + 1}`;
  typingArea.value = "";
  typingArea.focus();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 45;
  timeEl.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;

    if (timeLeft === 0) {
      nextRound();
    }
  }, 1000);
}

function nextRound() {
  clearInterval(timer);
  currentRound++;

  if (currentRound >= levels[currentLevel].length) {
    currentLevel++;
    currentRound = 0;

    if (currentLevel >= levels.length) {
      alert("🎉 You completed all levels!");
      currentLevel = 0;
    } else {
      alert("✅ Level Completed!");
    }
  }

  loadRound();
  startTimer();
}

function restart() {
  currentLevel = 0;
  currentRound = 0;
  loadRound();
  startTimer();
}

// -------- START APP --------
loadRound();
startTimer();

