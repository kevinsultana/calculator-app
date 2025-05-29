const toggleBtn = document.getElementById("toggle-mode");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const display = document.getElementById("display");

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
  try {
    if (isOperator) {
      alert("Please enter a valid number first.");
      return;
    } else if (display.value === "") {
      alert("Please enter a valid number first.");
      return;
    }
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

window.addEventListener("keypress", (event) => {
  console.log(event.key);

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
