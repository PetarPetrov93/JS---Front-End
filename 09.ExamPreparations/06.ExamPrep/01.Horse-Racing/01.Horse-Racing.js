function solve(input){
    const contestents = input.shift().split("|");
    
    while (input[0] !== "Finish") {
        
        const [command, horse1, horse2] = input.shift().split(" ");

        const indexHorse1 = contestents.indexOf(horse1);

        if (command === "Retake") {
            const indexHorse2 = contestents.indexOf(horse2);

            if (indexHorse1 < indexHorse2) {
                
                contestents.splice(indexHorse1, 1);
                contestents.splice(indexHorse2, 0, horse1);
                contestents.splice(indexHorse1, 0, horse2);
                contestents.splice(indexHorse2, 1);

                console.log(`${horse1} retakes ${horse2}.`);
            }
        }
        else if (command === "Trouble") {
            if (indexHorse1 > 0) {

                contestents.splice(indexHorse1, 1);
                contestents.splice(indexHorse1-1, 0, horse1);
                console.log(`Trouble for ${horse1} - drops one position.`);
            }
        }
        else if (command === "Rage") {

            if (indexHorse1 == contestents.length-2) {
                contestents.splice(indexHorse1+1, 0, horse1);
                contestents.splice(indexHorse1, 1);
            }
            else if (indexHorse1 !== contestents.length-1) {
                contestents.splice(indexHorse1, 1);
                contestents.splice(indexHorse1+2, 0, horse1);
            }
            console.log(`${horse1} rages 2 positions ahead.`);
        }
        else if (command === "Miracle") {
            const lastHorse = contestents.shift();
            contestents.push(lastHorse);
            console.log(`What a miracle - ${lastHorse} becomes first.`);
        }
    }
    console.log(contestents.join("->"));
    console.log(`The winner is: ${contestents[contestents.length-1]}`);
}

solve(['Bella|Alexia|Sugar',
'Retake Alexia Sugar',
'Rage Bella',
'Trouble Bella',
'Finish']);
console.log('---------------------------------------------------------------');
solve(['Onyx|Domino|Sugar|Fiona',
'Trouble Onyx',
'Retake Onyx Sugar',
'Rage Domino',
'Miracle',
'Finish']);
console.log('---------------------------------------------------------------');
solve(['Fancy|Lilly',
'Retake Lilly Fancy',
'Trouble Lilly',
'Trouble Lilly',
'Finish',
'Rage Lilly']);