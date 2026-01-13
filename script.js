alert("JS Connected Successfully");
let time = 60;
let timer;
let started = false;

const text = document.getElementById("text").innerText;
function login() 
    const name = document.getElementById("username").value;
    if (name === "") {
      alter("Please enter your name");
      return;
    }
    localStorage.setItem("user", name);
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
    const wpm = Math.round((wordsTyped / (60 - time + 1)) * 60);
    document.getElementById("wpm").innerText = isNaN(wpm) ? 0 : wpm;

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === text[i]) correctChars++;
    }

    let accuracy = Math.round((correctChars / input.length) * 100);
    document.getElementById("accuracy").innerText = isNaN(accuracy) ? 100 : accuracy;
}

function updateTime() {
    time--;
    document.getElementById("time").innerText = time;

    if (time === 0) {
        clearInterval(timer);
        document.getElementById("input").disabled = true;
        alert("Time up!");
    }
}

function resetTest() {
    location.reload();
}
