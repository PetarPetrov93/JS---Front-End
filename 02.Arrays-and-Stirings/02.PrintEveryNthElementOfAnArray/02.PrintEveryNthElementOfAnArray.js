function solve(inputArray, step) {
    let filteredArr = [];

    for (let i = 0; i < inputArray.length; i+= step) {
        
        filteredArr.push(inputArray[i]);
    }

    return filteredArr;
}

solve(['5', '20', '31', '4', '20'], 2);
solve(['dsa','asd', 'test', 'tset'], 2);
solve(['1', '2','3', '4', '5'], 6);