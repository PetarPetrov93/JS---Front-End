function solve(arrayOfNums) {
    arrayOfNums.sort((a, b) => a - b);

    let sortedArray = [];

    while (arrayOfNums.length > 0) {
        sortedArray.push(arrayOfNums[0]);
        arrayOfNums.shift();

        if(arrayOfNums.length > 0){
            sortedArray.push(arrayOfNums[arrayOfNums.length-1]);
            arrayOfNums.pop();
        }

    }

    return sortedArray;
}

solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);
solve([1]);
solve([1, -4]);
solve([1, -5, 6]);