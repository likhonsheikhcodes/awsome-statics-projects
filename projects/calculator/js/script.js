let display = document.getElementById("display");

function clearDisplay() {
  display.value = "";
}

function appendToDisplay(value) {
  display.value += value;
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
