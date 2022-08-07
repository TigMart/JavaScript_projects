const variables = [];
const typeNames = ["nat", "real"];
const Instructions = ["cond", "loop"];
let stack = [];

condition_flag = 0;
loop_flag = 0;

function Variable() {
  this.type_name;
  this.variable_name;
  this.value;
}
let out = document.getElementById("output");
let run = document.querySelector("button");

function readFile() {
  const input = document.getElementById("input");
  out.textContent = "";

  let arr = input.value.split("\n");
  function readLine() {
    for (line of arr) {
      if (line === "") {
        continue;
      }

      let str = line.split(" ");
      checks(str);
    }
  }
  readLine();
  if (condition_flag) {
    out.textContent += "\n" + "Compile Error" + "\n";
    return new Error();
  }
}

function checks(str) {
  if (condition_flag || loop_flag) {
    if (checkWords(str[0], Instructions)) {
      out.textContent += "\n" + "Compile Error" + "\n";
      return new Error();
    }
    if (str[0] === "}") {
      condition_flag = 0;

      return true;
    } else if (condition_flag === -1) {
      return true;
    }
  }

  if (checkWords(str[0], typeNames)) {
    convertTypeName(str);
  } else if (str[0] === "print") {
    tpel(str);
  } else if (checkWords(str[0], variables)) {
    arithmetic(str);
  } else if (str[0] == "cond") {
    condition_flag = condition(str);
  } else if (str[0] == "loop") {
    // loop(str);
  } else {
    out.textContent += "\n" + "Compile Error" + "\n";
    return new Error();
  }
}

function arithmetic(arr) {
  let tmp1 = 0;
  let tmp2 = 0;
  let result = 0;
  console.log(arr);
  if (arr.length === 5 || arr.length === 3) {
    if (arr[1] !== "=") {
      out.textContent += "\n" + "Compile Error" + "\n";
      throw new Error();
    }
    if (checkIsDigit(arr[2])) {
      tmp1 = +arr[2];
      let index = checkVariable(arr[0]);
      if (stack[index].type_name === "nat") {
        stack[index].value = parseInt(tmp1);
      } else {
        stack[index].value = parseFloat(tmp1);
      }
    } else if (checkWords(arr[2], variables)) {
      let index = checkVariable(arr[2]);
      if (stack[index].type_name === "nat") {
        tmp1 = parseInt(stack[index].value);
      } else {
        tmp1 = parseFloat(stack[index].value);
      }
    } else {
      out.textContent += "\n" + "Compile Error" + "\n";
      throw new Error();
    }
    if (arr.length === 5) {
      if (checkIsDigit(arr[4])) {
        tmp2 = +arr[4];
      } else if (checkWords(arr[4], variables)) {
        let index = checkVariable(arr[4]);
        if (stack[index].type_name === "nat") {
          tmp2 = parseInt(stack[index].value);
        } else {
          tmp2 = parseFloat(stack[index].value);
        }
      } else {
        out.textContent += "\n" + "Compile Error" + "\n";
        throw new Error();
      }
      let index = checkVariable(arr[0]);
      if (arr[3] === "+") {
        result = tmp1 + tmp2;
      } else if (arr[3] === "-") {
        result = tmp1 - tmp2;
      } else if (arr[3] === "*") {
        result = tmp1 * tmp2;
      } else if (arr[3] === "/") {
        if (tmp2 == 0) {
          out.textContent += "\n" + "Compile Error" + "\n";
          throw new Error();
        }
        result = tmp1 / tmp2;
      } else {
        out.textContent += "\n" + "Compile Error" + "\n";
        throw new Error();
      }
      if (stack[index].type_name === "nat") {
        stack[index].value = parseInt(result);
      } else {
        stack[index].value = parseFloat(result);
      }
    }
  } else {
    out.textContent += "\n" + "Compile Error" + "\n";
    throw new Error();
  }
}

function tpel(arr) {
  for (let i = 1; i < arr.length; i++) {
    let flag = 0;
    for (let j = 0; j < variables.length; j++) {
      if (arr[i] === variables[j]) {
        console.log(stack[j]);
        if (stack[j].type_name === "nat") {
          console.log("if type nat: ", stack[j]);
          out.textContent += stack[j].value;
        } else if (stack[j].type_name === "real") {
          out.textContent += stack[j].value;
        }
        ++flag;
        break;
      }
    }
    if (flag === 0) {
      out.textContent += arr[i];
    }
    out.textContent += " ";
  }
  out.textContent += "\n";
  return false;
}

function convertTypeName(arr) {
  console.log(arr);
  if (arr.length !== 2 && arr.length !== 4) {
    out.textContent += "\n" + "Compile Error" + "\n";
    throw new Error();
  }
  if (!checkSyntaxVariables(arr[1])) {
    out.textContent += "\n" + "Compile Error" + "\n";
    throw new Error();
  } else {
    variables.push(arr[1]);
  }
  if (arr.length === 4) {
    if (arr[2] !== "=") {
      out.textContent += "\n" + "Compile Error" + "\n";
      throw new Error();
    }
    if (!checkIsDigit(arr[3])) {
      out.textContent += "\n" + "Compile Error" + "\n";
      throw new Error();
    }
  }
  let p = new Variable();
  p.type_name = arr[0];
  p.variable_name = arr[1];
  if (p.type_name === "nat" && isInt(+arr[3])) {
    p.value = new Number();
    if (arr.length === 4) {
      p.value = +arr[3];
    } else {
      p.value = 0;
    }
  } else if (p.type_name === "real" && !isInt(+arr[3])) {
    p.value = new Number();
    if (arr.length === 4) {
      p.value = +arr[3];
    } else {
      p.value = 0;
    }
  }
  stack.push(p);
  //   console.log(stack);
  return true;
}

// cond
function condition(arr) {
  let tmp1 = 0;
  let tmp2 = 0;
  if (arr.length !== 5) {
    out.textContent += "\n" + "Compile Error" + "\n";
    return false;
  }
  if (checkIsDigit(arr[1])) {
    tmp1 = +arr[1];
  } else if (checkWords(arr[1], variables)) {
    let index = checkVariable(arr[1]);
    if (stack[index].type_name === "nat" || stack[index].type_name === "real") {
      tmp1 = stack[index].value;
    }
  } else {
    out.textContent += "\n" + "Compile Error" + "\n";
    return false;
  }
  if (checkIsDigit(arr[3])) {
    tmp2 = +arr[3];
  } else if (checkWords(arr[3], variables)) {
    let index = checkVariable(arr[3]);
    if (stack[index].type_name === "nat" || stack[index].type_name === "real") {
      tmp2 = stack[index].value;
    }
  } else {
    out.textContent += "\n" + "Compile Error" + "\n";
    return false;
  }
  if (arr[4] !== "{") {
    out.textContent += "\n" + "Compile Error" + "\n";
    return false;
  }
  if (arr[2] === ">") {
    if (tmp1 > tmp2) return 1;
    else return -1;
  } else if (arr[2] == "<") {
    if (tmp1 < tmp2) return 1;
    else return -1;
  } else if (arr[2] == "==") {
    if (tmp1 === tmp2) return 1;
    else return -1;
  } else if (arr[2] === "!=") {
    if (tmp1 != tmp2) return 1;
    else return -1;
  } else {
    out.textContent += "\n" + "Compile Error" + "\n";
    throw new Error();
  }
}

function checkSyntaxVariables(str) {
  if ((str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) || (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122) || str.charCodeAt(0) === "_") {
  } else return false;
  for (let i = 1; i < str.length; i++) {
    if (
      (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) ||
      (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) ||
      (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) ||
      str.charCodeAt(i) === "_"
    ) {
    } else return false;
  }
  return true;
}

function checkVariable(str) {
  for (let i = 0; i < variables.length; i++) {
    if (str === variables[i]) {
      return i;
    }
  }
  return -1;
}

function checkIsDigit(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ".") {
      ++count;
      if (count === 1) {
        continue;
      } else return false;
    }
    if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) {
    } else return false;
  }
  return true;
}

function checkWords(str, arr) {
  for (let i = 0; i < arr.length; ++i) {
    if (str === arr[i]) return true;
  }
  return false;
}

function isInt(str) {
  return str % 1 === 0;
}

run.addEventListener("click", () => {
  readFile();
});
