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
const strengthDisplay = document.getElementById("strength");

const nextRoundBtn = document.getElementById("nextRoundBtn");
const userNameDisplay = document.getElementById("userNameDisplay");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const restartBtn = document.getElementById("restartBtn");

const keys = document.querySelectorAll(".key");

const levels = [
  { name:"Alphabet", rounds:["a b c d e","f g h i j"] },
  { name:"Words", rounds:["cat dog fish","apple banana"] },
  { name:"Sentence", rounds:["Typing makes you faster."] }
];

let level = 0, round = 0;
let totalTyped = 0, correctTyped = 0;
let timer, timeLeft = 60;

startBtn.onclick = () => {
  if(!usernameInput.value.trim()) return alert("Enter your name");
  loginBox.classList.add("hidden");
  typingBox.classList.remove("hidden");
  userNameDisplay.textContent = usernameInput.value;
  loadRound();
};

function loadRound() {
  const text = levels[level].rounds[round];
  textDisplay.innerHTML = "";

  text.split("").forEach(ch => {
    const span = document.createElement("span");
    span.textContent = ch;
    textDisplay.appendChild(span);
  });

  typingArea.value = "";
  typingArea.disabled = false;
  typingArea.focus();

  levelIndicator.textContent = `${levels[level].name} → Round ${round+1}`;
  nextRoundBtn.classList.add("hidden");

  totalTyped = correctTyped = 0;
  timeLeft = 60;
  timerDisplay.textContent = "60s";

  clearInterval(timer);
  timer = setInterval(updateTimer,1000);
}

typingArea.addEventListener("input", () => {
  const spans = textDisplay.querySelectorAll("span");
  const typed = typingArea.value;

  totalTyped = typed.length;
  correctTyped = 0;

  spans.forEach((span,i)=>{
    if(!typed[i]) span.className="";
    else if(typed[i]===span.textContent){
      span.className="correct"; correctTyped++;
    } else span.className="wrong";
  });

  const wpm = Math.round((correctTyped/5)/((60-timeLeft)/60)||0);
  const acc = totalTyped ? Math.round(correctTyped/totalTyped*100) : 0;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = acc+"%";
  strengthDisplay.textContent = Math.min(100,Math.round(wpm))+"%";

  if(typed === levels[level].rounds[round]){
    finishRound();
  }
});

function updateTimer(){
  timeLeft--;
  timerDisplay.textContent = timeLeft+"s";
  if(timeLeft<=0) finishRound();
}

function finishRound(){
  clearInterval(timer);
  typingArea.disabled = true;
  nextRoundBtn.classList.remove("hidden");
}

nextRoundBtn.onclick = () => {
  if(round < levels[level].rounds.length-1) round++;
  else if(level < levels.length-1){ level++; round=0; }
  else {
    typingBox.classList.add("hidden");
    endBox.classList.remove("hidden");
    finalWpm.textContent = wpmDisplay.textContent;
    finalAccuracy.textContent = accuracyDisplay.textContent;
    return;
  }
  loadRound();
};

restartBtn.onclick = () => location.reload();

/* Keyboard highlight */
document.addEventListener("keydown",e=>{
  keys.forEach(k=>{
    if(k.dataset.key===e.key.toLowerCase()) k.classList.add("active");
  });
});
document.addEventListener("keyup",e=>{
  keys.forEach(k=>{
    if(k.dataset.key===e.key.toLowerCase()) k.classList.remove("active");
  });
});
