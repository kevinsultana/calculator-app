const clickSound = new Audio("./assets/sound/click.wav");

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

const toggleDark = document.getElementById("toggle-dark");

toggleDark.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggleDark.checked);
});

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");

let rawDisplay = "";

function formatNumber(value) {
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function formatDisplay(display) {
  return display.replace(/\d+(\.\d+)?/g, (match) => formatNumber(match));
}

function updateDisplay() {
  display.value = formatDisplay(rawDisplay);
}

function clearHistory() {
  const isConfirmed = confirm("Are you sure you want to clear the history?");
  if (!isConfirmed) return;

  historyDisplay.innerHTML = "";
  document.getElementById("clear-history").style.display = "none";
  document.getElementById("history").style.display = "none";
}

function appendValue(value) {
  playClickSound();

  if (display.value === "Error") {
    rawDisplay = "";
  }

  const lastChar = rawDisplay.slice(-1);

  if (value === ".") {
    if (rawDisplay === "" || ["+", "-", "*", "/"].includes(lastChar)) {
      rawDisplay += "0.";
    } else {
      rawDisplay += value;
    }
  } else {
    rawDisplay += value;
  }

  updateDisplay();
}

function deleteLast() {
  playClickSound();
  rawDisplay = rawDisplay.slice(0, -1);
  updateDisplay();
}

function clearDisplay() {
  playClickSound();
  if (rawDisplay) {
    let isConfirmed = confirm("Are you sure you want to clear the display?");
    if (isConfirmed) {
      rawDisplay = "";
      updateDisplay();
    }
  }
}

function appendOperator(operator) {
  playClickSound();
  const lastChar = rawDisplay.slice(-1);
  const isOperator = ["+", "-", "*", "/"].includes(lastChar);

  if (rawDisplay === "" && operator !== "-") return;

  if (isOperator) {
    rawDisplay = rawDisplay.slice(0, -1) + operator;
  } else {
    rawDisplay += operator;
  }
  updateDisplay();
}

function calculate() {
  playClickSound();
  const lastChar = rawDisplay.slice(-1);
  const isOperator = ["+", "-", "*", "/"].includes(lastChar);

  if (isOperator || rawDisplay === "") {
    alert("Please enter a valid number first.");
    return;
  }

  if (lastChar === ".") {
    alert("Please enter a valid number first.");
    return;
  }

  try {
    const result = eval(rawDisplay);
    const formattedResult = formatNumber(result);
    const historyItem = document.createElement("p");
    historyItem.textContent = `${formatDisplay(
      rawDisplay
    )} = ${formattedResult}`;
    historyDisplay.appendChild(historyItem);
    historyDisplay.scrollTop = historyDisplay.scrollHeight;

    document.getElementById("clear-history").style.display = "block";
    document.getElementById("history").style.display = "block";

    rawDisplay = result.toString();
    updateDisplay();
  } catch (error) {
    display.value = "Error";
    rawDisplay = "";
  }
}

window.addEventListener("keypress", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    appendValue(event.key);
  }
  if (event.key === "Enter") {
    calculate();
  }
  if (event.key === "+") {
    appendOperator("+");
  }
  if (event.key === "-") {
    appendOperator("-");
  }
  if (event.key === "*") {
    appendOperator("*");
  }
  if (event.key === "/") {
    appendOperator("/");
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    deleteLast();
  }
  if (event.key === "Escape") {
    clearDisplay();
  }
});
