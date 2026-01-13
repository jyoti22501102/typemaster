const loginBox = document.getElementById("loginBox");
const typingBox = document.getElementById("typingBox");
const endBox = document.getElementById("endBox");
const usernameInput = document.getElementById("username");
const startBtn = document.getElementById("startBtn");
const textDisplay = document.getElementById("textDisplay");
const typingArea = document.getElementById("typingArea");
const levelIndicator = document.getElementById("levelIndicator");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const userNameDisplay = document.getElementById("userNameDisplay");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const restartBtn = document.getElementById("restartBtn");

// Typing levels and rounds
const levels = [
    { name: "Alphabet", rounds: ["a b c d e f g h i j", "k l m n o p q r s t", "u v w x y z"] },
    { name: "Words", rounds: ["cat dog fish bird", "apple banana orange grape", "car bus train plane"] },
    { name: "Sentences", rounds: ["Typing is fun.", "Practice makes perfect.", "Always keep learning new things."] },
    { name: "Paragraphs", rounds: ["This is a paragraph. It contains multiple sentences to practice typing and improve speed and accuracy."] },
    { name: "Stories", rounds: ["Once upon a time, in a land far away, there lived a curious little fox who loved adventures."] }
];

let currentLevel = 0;
let currentRound = 0;
let totalTyped = 0;
let correctTyped = 0;
let timer;
let timeLeft = 60;

startBtn.addEventListener("click", () => {
    if (usernameInput.value.trim() === "") return alert("Enter your name!");
    loginBox.classList.add("hidden");
    typingBox.classList.remove("hidden");
    userNameDisplay.textContent = usernameInput.value;
    loadRound();
});

function loadRound() {
    const roundText = levels[currentLevel].rounds[currentRound];
    textDisplay.innerHTML = "";
    roundText.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        textDisplay.appendChild(span);
    });
    typingArea.value = "";
    typingArea.focus();
    levelIndicator.textContent = `${levels[currentLevel].name} → Round ${currentRound + 1}`;
    nextRoundBtn.classList.add("hidden");
    timeLeft = 60;
    timerDisplay.textContent = `${timeLeft}s`;
    totalTyped = 0;
    correctTyped = 0;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

typingArea.addEventListener("input", () => {
    const roundText = levels[currentLevel].rounds[currentRound];
    const typed = typingArea.value;
    totalTyped = typed.length;
    correctTyped = 0;
    const spans = textDisplay.querySelectorAll("span");

    spans.forEach((span, index) => {
        const char = typed[index];
        if (char == null) {
            span.classList.remove("correct", "wrong");
        } else if (char === span.textContent) {
            span.classList.add("correct");
            span.classList.remove("wrong");
            correctTyped++;
        } else {
            span.classList.add("wrong");
            span.classList.remove("correct");
        }
    });

    const wpm = Math.round((correctTyped / 5) / ((60 - timeLeft) / 60) || 0);
    const accuracy = totalTyped === 0 ? 0 : Math.round((correctTyped / totalTyped) * 100);
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
});

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        nextRoundBtn.classList.remove("hidden");
        typingArea.disabled = true;
    }
}

nextRoundBtn.addEventListener("click", () => {
    typingArea.disabled = false;
    if (currentRound < levels[currentLevel].rounds.length - 1) {
        currentRound++;
    } else if (currentLevel < levels.length - 1) {
        currentLevel++;
        currentRound = 0;
    } else {
        // End of all levels
        typingBox.classList.add("hidden");
        endBox.classList.remove("hidden");
        finalWpm.textContent = wpmDisplay.textContent;
        finalAccuracy.textContent = accuracyDisplay.textContent;
        return;
    }
    loadRound();
});

restartBtn.addEventListener("click", () => {
    currentLevel = 0;
    currentRound = 0;
    endBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
});
