function solve(input){

    let encryptedMessage = input.shift();

    while (input[0] !== 'Buy') {
        
        let cmd = input.shift().split("?");
        let command = cmd[0];
        let substring = "";

        if (command === "TakeEven") {
            
            let messageWithoutOdds = "";

            for (let i = 0; i < encryptedMessage.length; i+=2) {
                
                messageWithoutOdds += encryptedMessage[i];
                
            }

            encryptedMessage = messageWithoutOdds;

            console.log(encryptedMessage);

        }
        else if (command === "ChangeAll") {
            
            substring = cmd[1];
            let replacement = cmd[2];

            encryptedMessage = encryptedMessage.replace(new RegExp(substring, 'g'), replacement);
            console.log(encryptedMessage);
        }
        else if (command === "Reverse") {
            
            substring = cmd[1];

            if (encryptedMessage.includes(substring)) {
                
                let startingIndex = encryptedMessage.indexOf(substring);
                encryptedMessage = encryptedMessage.slice(0, startingIndex) + encryptedMessage.slice(startingIndex + substring.length);
                let reversedSubstring = "";
                for (let i = substring.length-1; i >= 0; i--) {
                    
                    reversedSubstring += substring[i];
                    
                }

                encryptedMessage += reversedSubstring;

                console.log(encryptedMessage);
            }
            else{
                console.log("error");
            }

        }

    }
    console.log(`The cryptocurrency is: ${encryptedMessage}`);
}


solve(["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs", 
"TakeEven",
"Reverse?!nzahc",
"ChangeAll?m?g",
"Reverse?adshk",
"ChangeAll?z?i",
"Buy"]);

console.log("-----------------------------------------------------");

solve(["PZDfA2PkAsakhnefZ7aZ", 
"TakeEven",
"TakeEven",
"TakeEven",
"ChangeAll?Z?X",
"ChangeAll?A?R",
"Reverse?PRX",
"Buy"]);