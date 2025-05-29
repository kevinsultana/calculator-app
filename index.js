const toggleBtn = document.getElementById("toggle-mode");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

function appendValue(value) {
  display.value += value;
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function clearDisplay() {
  display.value = "";
}

function appendOperator(operator) {
  display.value += operator;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
