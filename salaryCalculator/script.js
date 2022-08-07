// Colors
const btnColorOnClick = "#336699";
const btnColor = "#f3f3f3";
const answerColor = "#ff4545";

const btnReg = document.querySelector(".registered");
const btnClear = document.querySelector(".clear");
const answer_1 = document.querySelector(".answer_1");
const answer_2 = document.querySelector(".answer_2");
const answer_3 = document.querySelector(".answer_3");
const inputSalary = document.querySelector(".salary-section__salary-input");
const incomeTax = document.querySelector(".income-tax");
const socialFee = document.querySelector(".social-fee");
const stampFee = document.querySelector(".stamp-fee");
const output = document.querySelector(".output");
const outputTitle = document.querySelector(".output-title");
const descrip = document.getElementById("description");

//  reset
inputSalary.addEventListener("click", () => {
  inputSalary.value = "";
  descrip.innerHTML = "Խնդրում ենք մուտքագրեք գումարը";
  incomeTax.innerHTML = 0;
  socialFee.innerHTML = 0;
  stampFee.innerHTML = 0;
  output.innerHTML = 0;
});

answer_1.addEventListener("click", () => {
  answer_1.setAttribute("id", "btn-checked");
  answer_2.removeAttribute("id");
  answer_3.removeAttribute("id");
});

answer_2.addEventListener("click", () => {
  answer_1.removeAttribute("id");
  answer_2.setAttribute("id", "btn-checked");
  answer_3.removeAttribute("id");
});

answer_3.addEventListener("click", () => {
  answer_1.removeAttribute("id");
  answer_2.removeAttribute("id");
  answer_3.setAttribute("id", "btn-checked");
});

const clearSalaryDefault = function (salary) {
  let numSalary = +salary;
  if (numSalary <= 500000) {
    incomeTax.innerHTML = Math.trunc((salary * 21) / 100);
    socialFee.innerHTML = Math.trunc((salary * 4.5) / 100);
  } else if (numSalary > 500000 && numSalary <= 1020000) {
    incomeTax.innerHTML = Math.trunc((numSalary * 21) / 100);
    socialFee.innerHTML = Math.trunc(numSalary * 0.1 - 27500);
  } else {
    incomeTax.innerHTML = Math.trunc((numSalary * 21) / 100);
    socialFee.innerHTML = 74500;
  }

  if (numSalary <= 100000) stampFee.innerHTML = 1500;
  else if (numSalary > 100000 && numSalary <= 200000) stampFee.innerHTML = 3000;
  else if (numSalary > 200000 && numSalary <= 500000) stampFee.innerHTML = 5500;
  else if (numSalary > 500000 && numSalary <= 1000000) stampFee.innerHTML = 8500;
  else stampFee.innerHTML = 15000;
  output.innerHTML = numSalary - +incomeTax.innerHTML - +socialFee.innerHTML - +stampFee.innerHTML;
};

const regSalaryDefault = function (salary) {
  let numSalary = +salary;
  if (numSalary <= 73000) stampFee.innerHTML = 1500;
  else if (numSalary > 73000 && numSalary <= 146000) stampFee.innerHTML = 3000;
  else if (numSalary > 146000 && numSalary <= 367000) stampFee.innerHTML = 5500;
  else if (numSalary > 367000 && numSalary <= 709000) stampFee.innerHTML = 8500;
  else stampFee.innerHTML = 15000;
  if (numSalary < 367000) {
    let regsalary = Math.round(((numSalary + +stampFee.innerHTML) * 100) / 74.5);
    incomeTax.innerHTML = Math.round((regsalary * 21) / 100);
    socialFee.innerHTML = Math.round((regsalary * 4.5) / 100);
    output.innerHTML = regsalary;
  } else if (numSalary > 367000 && numSalary <= 716300) {
    let regsalary = Math.round((numSalary + +stampFee.innerHTML - 27500) / 0.69);
    incomeTax.innerHTML = Math.round((regsalary * 21) / 100);
    socialFee.innerHTML = Math.round(regsalary * 0.1 - 27500);
    output.innerHTML = regsalary;
  } else {
    let regsalary = Math.round((numSalary + +stampFee.innerHTML + 74500) / 0.79);
    incomeTax.innerHTML = Math.round((regsalary * 21) / 100);
    socialFee.innerHTML = 74500;
    output.innerHTML = regsalary;
  }
};

const descriptionReg = function (salary) {
  let savingsAccount = 0;
  let savingsAccountPerMonth = 0;
  if (+salary <= 500000) {
    savingsAccount = Math.round((+salary * 5.5) / 100);
  } else savingsAccount = 27500;
  if (+salary <= 1000000) {
    savingsAccountPerMonth = Math.round(+salary * 0.1);
  } else savingsAccountPerMonth = 102000;

  descrip.innerHTML = `${salary} դրամ աշխատավարձ գրանցելու դեպքում մաքուր կստանաք ${output.innerHTML} դրամ: Եկամտային հարկը կկազմի ${incomeTax.innerHTML} դրամ: Սոցիալական վճարը\` ${socialFee.innerHTML} դրամ: Պետության կողմից Ձեր կուտակային հաշվին հավելյալ կփոխանցվի  ${savingsAccount} դրամ: Կուտակային հաշվի ամսական համալրումը կկազմի ${savingsAccountPerMonth}
   դրամ: Զինծառայողների Ապահովագրության Հիմնադրամի դրոշմանիշային վճարը ${stampFee.innerHTML} դրամ է։`;
};

const descriptionClear = function (salary) {
  let savingsAccount = 0;
  let savingsAccountPerMonth = 0;

  if (+salary <= 367000) {
    savingsAccount = Math.trunc((+output.innerHTML * 5.5) / 100);
  } else savingsAccount = 27500;
  if (+salary <= 716300) {
    savingsAccountPerMonth = Math.trunc(+output.innerHTML * 0.1);
  } else savingsAccountPerMonth = 102000;

  descrip.innerHTML = `${salary} դրամ մաքուր աշխատավարձ ստանալու համար պետք է գրանցել ${output.innerHTML} դրամ: Եկամտային հարկը կկազմի ${incomeTax.innerHTML} դրամ: Սոցիալական վճարը\` ${socialFee.innerHTML} դրամ: Պետության կողմից Ձեր կուտակային հաշվին հավելյալ կփոխանցվի ${savingsAccount} դրամ: Կուտակային հաշվի ամսական համալրումը կկազմի ${savingsAccountPerMonth} դրամ: Զինծառայողների Ապահովագրության Հիմնադրամի դրոշմանիշային վճարը ${stampFee.innerHTML} դրամ է։`;
};

inputSalary.addEventListener("keyup", () => {
  if (btnReg.hasAttribute("id") && answer_2.hasAttribute("id")) {
    clearSalaryDefault(inputSalary.value);
    descriptionReg(inputSalary.value);
  }
  if (btnClear.hasAttribute("id") && answer_2.hasAttribute("id")) {
    regSalaryDefault(inputSalary.value);
    descriptionClear(inputSalary.value);
  }
  if (inputSalary.value === "") {
    descrip.innerHTML = "Խնդրում ենք մուտքագրեք գումարը";
    incomeTax.innerHTML = 0;
    socialFee.innerHTML = 0;
    stampFee.innerHTML = 0;
    output.innerHTML = 0;
  }
});

if (btnReg.hasAttribute("id") && answer_2.hasAttribute("id")) {
  clearSalaryDefault(inputSalary.value);
  descriptionReg(inputSalary.value);
}

btnReg.addEventListener("click", () => {
  btnReg.setAttribute("id", "checkRegClear");
  btnClear.removeAttribute("id");
  outputTitle.innerHTML = "Մաքուր Մնացորդ";
  if (btnReg.hasAttribute("id") && answer_2.hasAttribute("id")) {
    clearSalaryDefault(inputSalary.value);
    descriptionReg(inputSalary.value);
  }
});

if (btnClear.hasAttribute("id") && answer_2.hasAttribute("id")) {
  regSalaryDefault(inputSalary.value);
  descriptionClear(inputSalary.value);
}

btnClear.addEventListener("click", () => {
  btnClear.setAttribute("id", "checkRegClear");
  btnReg.removeAttribute("id");
  outputTitle.innerHTML = "Պետք է գրանցել";
  if (btnClear.hasAttribute("id") && answer_2.hasAttribute("id")) {
    regSalaryDefault(inputSalary.value);
    descriptionClear(inputSalary.value);
  }
});
