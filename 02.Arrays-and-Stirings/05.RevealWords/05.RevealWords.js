function solve(words, template){

    const wordsArr = words.split(", ");
    let templateAsArray = template.split(" ");

    for (let i = 0; i < templateAsArray.length; i++) {
        
        if (templateAsArray[i][0] === "*") {
            templateAsArray[i] = wordsArr.find(word => word.length == templateAsArray[i].length);
        }
        
    }
    console.log(templateAsArray.join(" "));
}

solve('great, learning', 'softuni is ***** place for ******** new programming languages');