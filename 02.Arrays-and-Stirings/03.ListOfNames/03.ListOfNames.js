function solve(arrOfNames){
    arrOfNames.sort((a,b) => {
       const lowerA = a.toLowerCase();
       const lowerB = b.toLowerCase();

       return lowerA.localeCompare(lowerB);
    });

    for (let i = 0; i < arrOfNames.length; i++) {
        console.log(`${i+1}.${arrOfNames[i]}`);
    }
}

solve(["John", "Bob", "Christina", "Ema", "Bob", "anick"]);