const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const decimalButton = document.getElementById('point');
const backspaceButton = document.getElementById('backspace');

let currentInput = '';
let currentOperator = null;
let previousInput = '';
let resultDisplayed = false;

function updateDecimalButton() {
  decimalButton.disabled = display.innerText.includes('.');
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (resultDisplayed) {
      clearDisplay();
      resultDisplayed = false;
    }
    currentInput += button.innerText;
    updateDisplay();
    updateDecimalButton();
  });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentInput !== '') {
        if (currentOperator !== null) {
          operate();
          updateDisplay();
          previousInput = currentInput;
        } else {
          previousInput = currentInput;
        }
        currentOperator = button.innerText;
        currentInput = '';
      }
      updateDecimalButton();
    });
  });

decimalButton.addEventListener('click', () => {
  if (currentInput.includes('.')||currentInput=='') {
    decimalButton.disabled = true; 
  }
  else{
      currentInput += '.';
      updateDisplay();
      decimalButton.disabled = true;
  }
});

backspaceButton.addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
  updateDecimalButton();
});

document.getElementById('equal').addEventListener('click', () => {
    if (currentInput !== '') {
      operate();
      currentOperator = null;
      resultDisplayed = true;
      updateDisplay();
    }
  });

document.getElementById('clear').addEventListener('click', () => {
  clearDisplay();
  currentInput = '';
  currentOperator = null;
  previousInput = '';
  resultDisplayed = false;
  decimalButton.disabled = false;
});

function updateDisplay() {
  display.innerText = currentInput;
}

function clearDisplay() {
  display.innerText = '';
}

function operate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        result = 'Can not divide by zero';
      } else {
        result = num1 / num2;
      }
      break;
    default:
      break;
  }
  if (result%1!==0) {
    currentInput = result.toFixed(3);
  }
  else{
    currentInput = result; 
  }

  decimalButton.disabled = false; 
  updateDisplay();
  updateDecimalButton(); 
}

clearDisplay();
