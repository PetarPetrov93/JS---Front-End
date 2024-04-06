function solve (input) {
    
    for (const word of input.split(" ")) {
        
        if (word[0] === "#" && word.length > 1) {
            let print = true;
            let wordWithoutHashTag = word.substring(1);

            for (const symbol of wordWithoutHashTag) {
                
                if ((symbol.charCodeAt(0) < 65 || 
                (symbol.charCodeAt(0) > 90 && symbol.charCodeAt(0) < 97) || 
                symbol.charCodeAt(0) > 122)) {

                    print = false;
                    break;
                }

            }
            if (print) {
                
                console.log(wordWithoutHashTag);
            }
        }

    }

}

solve('Nowadays everyone uses # to tag a #special word in #socialMedia');