function sameNumbersValidator(numbers) {
  const numsAsChar = String(numbers).split("");

  let sum = 0;

  let areIdentical = true;

  for (let i = 0; i < numsAsChar.length - 1; i++) {
    let currNum = Number(numsAsChar[i]);

    sum += currNum;

    let nextNum = Number(numsAsChar[i + 1]);

    if (currNum !== nextNum) {
      areIdentical = false;
    }
  }

  if (areIdentical) {
    console.log("true");
  } else {
    console.log("false");
  }

  sum += Number(numsAsChar[numsAsChar.length - 1]);
  console.log(sum);
}

sameNumbersValidator(1234);
