function coocingByNumbers(num, operation1, operation2, operation3, operation4, operation5) {
    let number = Number(num);

    let operationsArr = [operation1, operation2, operation3, operation4, operation5];

    for (let i = 0; i < operationsArr.length; i++) {
        if (operationsArr[i] === "chop") {
            number /= 2;
            console.log(number);
        }
        else if(operationsArr[i] === "dice"){
            number = Math.sqrt(number);
            console.log(number);
        }
        else if(operationsArr[i] === "spice"){
            number += 1;
            console.log(number);
        }
        else if(operationsArr[i] === "bake"){
            number *= 3;
            console.log(number);
        }
        else if(operationsArr[i] === "fillet"){
            number -= number*0.2;
            console.log(number);
        }
    }
}

coocingByNumbers('9', 'dice', 'spice', 'chop', 'bake', 'fillet');