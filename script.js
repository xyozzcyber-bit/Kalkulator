const display = document.querySelector('.layar');
const buttons = document.querySelector('.kalk');

let currentOperand = '0';
let previousOperand = null;
let operator = null;
let fullExpression = '';

const creditButton = document.querySelector('.tombol-credit');
const popupOverlay = document.querySelector('.popup-overlay');
const popupCloseButton = document.querySelector('.popup-close');

function updateDisplay() {
  display.textContent = fullExpression || currentOperand;
}

function handleInput(e) {
  const value = e.target.textContent;

  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  if (e.target.classList.contains('tombol-credit')) {
    popupOverlay.classList.add('show');
    return;
  }

  if (['+', '-', '×', '÷'].includes(value)) {
    if (operator && previousOperand !== null) {
      calculate();
    }
    operator = value;
    previousOperand = currentOperand;
    currentOperand = '0';
    fullExpression += value;
    updateDisplay();
    return;
  }

  if (value === '=') {
    calculate();
    operator = null;
    fullExpression = currentOperand;
    updateDisplay(); // Ini dia yang kurang!
    return;
  }

  if (value === 'C') {
    currentOperand = '0';
    previousOperand = null;
    operator = null;
    fullExpression = '';
    updateDisplay();
    return;
  }

  if (value === '←') {
    fullExpression = fullExpression.slice(0, -1);
    if (fullExpression.length === 0) {
      currentOperand = '0';
    } else {
      let lastChar = fullExpression.slice(-1);
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        currentOperand = previousOperand;
        operator = lastChar;
        previousOperand = null;
      } else {
        currentOperand = fullExpression.split(/[\+\-×÷]/).pop();
      }
    }
    updateDisplay();
    return;
  }
  
  if (value === '.') {
    if (!currentOperand.includes('.')) {
      currentOperand += value;
      fullExpression += value;
    }
  } else {
    if (currentOperand === '0') {
      currentOperand = value;
      fullExpression = value;
    } else {
      currentOperand += value;
      fullExpression += value;
    }
  }

  updateDisplay();
}

function calculate() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  let result = 0;
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      if (current === 0) {
        result = 'Error';
      } else {
        result = prev / current;
      }
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  previousOperand = null;
}

function closePopup() {
  popupOverlay.classList.remove('show');
}

buttons.addEventListener('click', handleInput);
popupCloseButton.addEventListener('click', closePopup);
