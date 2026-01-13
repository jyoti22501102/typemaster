let time = 60;
let timer = null;
let started = false;

const originalText =
  "Practice typing to improve your speed and accuracy. Keep your eyes on the screen.";

function login() {
  const name = document.getElementById("username").value.trim();

  if (name === "") {
    alert("Please enter your name");
    return;
  }

  localStorage.setItem("typemasterUser", name);

  document.getElementById("user").innerText = name;
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("typingBox").classList.remove("hidden");
}

function startTyping() {
  if (!started) {
    started = true;
    timer = setInterval(updateTime, 1000);
  }

  const input = document.getElementById("input").value;
  const wordsTyped = input.trim().split(/\s+/).length;
  const timeSpent = 60 - time;

  const wpm =
    timeSpent > 0 ? Math.round((wordsTyped / timeSpent) * 60) : 0;

  document.getElementById("wpm").innerText = wpm;

  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === originalText[i]) {
      correctChars++;
    }
  }

  const accuracy =
    input.length > 0
      ? Math.round((correctChars / input.length) * 100)
      : 100;

  document.getElementById("accuracy").innerText = accuracy;
}

function updateTime() {
  time--;
  document.getElementById("time").innerText = time;

  if (time === 0) {
    clearInterval(timer);
    document.getElementById("input").disabled = true;
    alert("Time up! Test completed.");
  }
}

function resetTest() {
  location.reload();
}
