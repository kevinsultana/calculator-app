const toggleDark = document.getElementById("toggle-dark");

toggleDark.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggleDark.checked);
});

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");

function clearHistory() {
  const isConfirmed = confirm("Are you sure you want to clear the history?");
  if (!isConfirmed) return;

  historyDisplay.innerHTML = "";
  document.getElementById("clear-history").style.display = "none";
  document.getElementById("history").style.display = "none";
}

function appendValue(value) {
  if (display.value === "Error") {
    display.value = value;
  } else {
    display.value += value;
  }
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function clearDisplay() {
  if (display.value && display.value !== "") {
    let isConfirmed = confirm("Are you sure you want to clear the display?");
    if (isConfirmed) {
      display.value = "";
    }
    return;
  }
}

function appendOperator(operator) {
  const lastChar = display.value.slice(-1);
  const isOperator = ["+", "-", "*", "/"].includes(lastChar);

  if (display.value === "" && operator !== "-") return;

  if (isOperator) {
    display.value = display.value.slice(0, -1) + operator;
  } else {
    display.value += operator;
  }
}

function calculate() {
  const lastChar = display.value.slice(-1);
  const isOperator = ["+", "-", "*", "/"].includes(lastChar);
  const historyValue = display.value;
  try {
    if (isOperator) {
      alert("Please enter a valid number first.");
      return;
    } else if (display.value === "") {
      alert("Please enter a valid number first.");
      return;
    }

    const result = eval(display.value);
    const newHistoryValue = document.createElement("p");
    newHistoryValue.textContent = `${historyValue} = ${result}`;
    historyDisplay.appendChild(newHistoryValue);
    historyDisplay.scrollTop = historyDisplay.scrollHeight;

    document.getElementById("clear-history").style.display = "block";
    document.getElementById("history").style.display = "block";
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

window.addEventListener("keypress", (event) => {
  if (event.key >= 0 && event.key <= 9) {
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
