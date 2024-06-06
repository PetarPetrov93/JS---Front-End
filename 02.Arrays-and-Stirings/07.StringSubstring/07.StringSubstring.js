function solve(word, text){

    let isFound = false;
    for (const wordForComparing of text.split(" ")) {
        
        if (word.toLowerCase() === wordForComparing.toLowerCase()) {
            console.log(word);
            isFound = true;
            break;
        }
    }

    if (!isFound) {
        console.log(`${word} not found!`);
    }

}

solve('javascript', 'JavaScript is the best programming language');
solve('python', 'JavaScript is the best programming language');