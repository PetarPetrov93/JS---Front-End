function solve(input){

    /* 1. promenliva s gl bukva
    2. cikul ot vtoriq simvol - natam dokato ne stigna gl bukva
    3. kato stigna gl bukva zapisvam dumata v list
    4. promenqm stoinostta na dumata s novata gl bukva i produljavam */

    let newWord = input[0];
    let wordsArr = [];

    for (let i = 1; i < input.length; i++) {
        
        if (input[i] === input[i].toLowerCase()) {
            newWord += input[i];
        }
        else{
            wordsArr.push(newWord);
            newWord = input[i];
        }
    }
    wordsArr.push(newWord);

    console.log(wordsArr.join(", "));
}

solve('SplitMeIfYouCanHaHaYouCantOrYouCan');
solve('HoldTheDoor');
solve('ThisIsSoAnnoyingToDo');
solve('ThisIsSoAnnoyingToDoICannotAndIDoNotWantToDoIt');