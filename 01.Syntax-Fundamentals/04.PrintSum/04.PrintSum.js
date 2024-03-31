function printAndSum(startingNum, endingNum) {

    let sum = 0;
    let numArr = [];
    for (let i = startingNum; i <= endingNum; i++) {
        
        sum += i;
        numArr.push(i);
    }
    console.log(numArr.join(" "));
    console.log(`Sum: ${sum}`);
}

printAndSum(0, 26);