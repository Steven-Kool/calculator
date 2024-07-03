const result = document.querySelector('.result-holder');
const numbers = Array.from(document.querySelectorAll('.numbers .boxes'));
const calculations = Array.from(document.querySelectorAll('.calculation-holder .boxes'));
const operate = document.querySelector('.operate');
const operators = ["+", "-", "x", "/"];
let resultText = "";

const calculate = (type, num1, num2) => {
  if(type === "+") {
    return num1 + num2;
  } else if(type === "-") {
    return num1 - num2;
  } else if(type === "x") {
    return num1 * num2;
  } else {
    return num1 / num2;
  }
}

calculations.forEach(cal => cal.addEventListener('click', () => {
  const text = result.value;
  if(text) {
    if(text[text.length - 1] === " ") {
      const joinedText = text.split('');
      joinedText.splice(joinedText.length - 2, 1, `${cal.innerHTML}`);
      const fixedText = joinedText.join('');

      result.value = fixedText;
    } else {
      result.value += ` ${cal.innerHTML} `;
    }
  } else {
    if(cal.innerHTML === "-") {
      result.value += `${cal.innerHTML}`;
    } else {
      alert("You must pust number first to calculate!!!");
    }
  }
}));

numbers.forEach(num => num.addEventListener('click', () => {
  if(num.innerHTML === "C") {
    result.value = "";
  } else {
    result.value += num.innerHTML;
  }
}));

const gettingResult = () => {
  const inputText = result.value;
  let found = false;
  let build;

  for(const text of inputText) {
    if(operators.includes(text)) {
      found = true;
    }
  }

  if(found) {
    const raw = inputText.split(' ');
    const frame = /\d+/;
    const numbers = raw.filter(i => frame.test(i));
    const opts = raw.filter(i => !frame.test(i));
    const convertedArray = numbers.map(num => Number(num));

    build = convertedArray[0];

    console.log(opts);
    console.log(numbers);

    for(let i = 1; i < convertedArray.length; i++) {
      build = calculate(opts[i - 1], build, convertedArray[i]);
    }

    result.value = build;
  } else {
    alert("You must enter at least one operator!!!");
  }
}

operate.addEventListener('click', gettingResult);
