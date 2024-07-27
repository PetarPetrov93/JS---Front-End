function solve(input){
    const n = input.shift();
    const pieces = {};

    for (let i = 0; i < n; i++) {
        
        const [piece, composer, key] = input.shift().split("|");
        const pieceData = {};
        pieceData["composer"] = composer;
        pieceData["key"] = key;
        pieces[`${piece}`] = pieceData;
    }

    while (input[0] !== "Stop") {
        
        const [command, piece, arg1, arg2] = input.shift().split("|");

        if (command === "Add") {

            if (pieces.hasOwnProperty(`${piece}`)) {
                console.log(`${piece} is already in the collection!`);
                continue;
            }

            const pieceData = {};
            pieceData["composer"] = arg1;
            pieceData["key"] = arg2;
            pieces[`${piece}`] = pieceData;
            console.log(`${piece} by ${arg1} in ${arg2} added to the collection!`);
        }
        else if (command === "Remove") {

            if (!pieces.hasOwnProperty(`${piece}`)) {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                continue;
            }
            delete pieces[piece];
            console.log(`Successfully removed ${piece}!`);
        }
        else if (command === "ChangeKey") {
            if (!pieces.hasOwnProperty(`${piece}`)) {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                continue;
            }
            pieces[`${piece}`]["key"] = arg1;
            console.log(`Changed the key of ${piece} to ${arg1}!`);
        }
    }
    for (const [piece, data] of Object.entries(pieces)) {
        
        console.log(`${piece} -> Composer: ${data["composer"]}, Key: ${data["key"]}`);

    }
}

solve([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
]);
console.log("--------------------------------------------------------------------");
solve([
    '4',
    'Eine kleine Nachtmusik|Mozart|G Major',
    'La Campanella|Liszt|G# Minor',
    'The Marriage of Figaro|Mozart|G Major',
    'Hungarian Dance No.5|Brahms|G Minor',
    'Add|Spring|Vivaldi|E Major',
    'Remove|The Marriage of Figaro',
    'Remove|Turkish March',
    'ChangeKey|Spring|C Major',
    'Add|Nocturne|Chopin|C# Minor',
    'Stop'
]);