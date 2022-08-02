const valueEl = document.getElementById("value");

const acEl = document.getElementById("ac");
const posnegEl = document.getElementById("pos-neg");
const percentEl = document.getElementById("percent");

const additionEl = document.getElementById("plus");
const subtractionEl = document.getElementById("subtraction");
const multiplicationEl = document.getElementById("multiply");
const divisionEl = document.getElementById("divide");
const equalEl = document.getElementById("equal");

const decimalEl = document.getElementById("decimal");
const number0El = document.getElementById("zero");
const number1El = document.getElementById("one");
const number2El = document.getElementById("two");
const number3El = document.getElementById("three");
const number4El = document.getElementById("four");
const number5El = document.getElementById("five");
const number6El = document.getElementById("six");
const number7El = document.getElementById("seven");
const number8El = document.getElementById("eight");
const number9El = document.getElementById("nine");

const numberElArray = [number0El, number1El, number2El, number3El, number4El, number5El, number6El, number7El, number8El, number9El];

// variables
let valueStrInMemory = null;
let operatorInMemory = null;

// Functions
const getValueAsStr = () => valueEl.textContent.split(",").join("");

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === ".") {
    valueEl.textContent += ".";
    return;
  }
  const [wholeNumStr, decimalStr] = valueStr.split(".");
  if (decimalStr) {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  if (valueEl.textContent.length <= 11) {
    const currentDisplayStr = getValueAsStr();
    if (currentDisplayStr === "0") {
      setStrAsValue(numStr);
    } else {
      setStrAsValue(currentDisplayStr + numStr);
    }
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === "addition") {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === "subtraction") {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === "multiplication") {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === "division") {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();
  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue("0");
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue("0");
};

// Add Event listner to functions
acEl.addEventListener("click", () => {
  setStrAsValue("0");
  valueStrInMemory = null;
  operatorInMemory = null;
});

posnegEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === "-0") {
    setStrAsValue("0");
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue("-" + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});

percentEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

// Add Event listners to operators

additionEl.addEventListener("click", () => {
  handleOperatorClick("addition");
});
subtractionEl.addEventListener("click", () => {
  handleOperatorClick("subtraction");
});
multiplicationEl.addEventListener("click", () => {
  handleOperatorClick("multiplication");
});
divisionEl.addEventListener("click", () => {
  handleOperatorClick("division");
});
equalEl.addEventListener("click", () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

// Add Event listner to numbers and decimal
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  console.log(numberEl);
  numberEl.addEventListener("click", () => {
    handleNumberClick(i.toString());
  });
}

decimalEl.addEventListener("click", () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes(".")) {
    setStrAsValue(currentValueStr + ".");
  }
});
