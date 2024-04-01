/* function solve(array, numOfRotations){

    for (let j = 1; j <= numOfRotations; j++) {

        let lastElementNewValue = array[0];

        for (let i = 0; i < array.length-1 ; i++) {

            array[i] = array[i+1];
            
        }

        array[array.length-1] = lastElementNewValue;
    }
   console.log(Array.from(array).join(" "));
}

solve([51, 47, 32, 61, 21], 2);
solve([32, 21, 61, 1], 4);
solve([2, 4, 15, 31], 5); */

function solve2(array, numOfRotations){
    for (let i = 1; i <= numOfRotations; i++) {
        
        let removedElement = array.shift();
        array.push(removedElement);
    }
    console.log(Array.from(array).join(" "));
}

solve2([51, 47, 32, 61, 21], 2);
solve2([32, 21, 61, 1], 4);
solve2([2, 4, 15, 31], 5);
