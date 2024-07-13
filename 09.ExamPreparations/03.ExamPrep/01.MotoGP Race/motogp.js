function solve(input){

    const numberOfRiders = input.shift();
    let riders = [];

    for (let i = 0; i < numberOfRiders; i++) {
        
        const [name, fuel, position] = input.shift().split("|");

        const rider = {
            name,
            fuel: Number(fuel),
            position,
            engineFail: false,
        };

        riders.push(rider);
    }

    while (input[0] !== "Finish") {
        
        const cmd = input.shift().split(" - ");
        const command = cmd[0];
        const riderName = cmd[1];
        // not specified if we should check explicitly if the rider exists!
        const rider = riders.find(r => r.name === riderName);

        if (command === "StopForFuel") {

            const minimumRefuel = Number(cmd[2]);
            const changedPossition = cmd[3];
            if (rider.fuel < minimumRefuel) {

                if (rider.fuel + minimumRefuel > 100) {
                    rider.fuel = 100;
                }
                else{
                    rider.fuel += minimumRefuel;
                }
                rider.position = changedPossition;

                console.log(`${riderName} stopped to refuel but lost his position, now he is ${changedPossition}.`);
            }
            else{

                console.log(`${riderName} does not need to stop for fuel!`);
            }
        }
        else if(command === "Overtaking"){
            //not sure exactly what they mean in the description, I'll do as I thing it shoudl be done
            const overtakenRider = riders.find(r => r.name === cmd[2]);
            if (rider.position < overtakenRider.position) {
                

                const overtakenRiderNewPosition = rider.position;
                rider.position = overtakenRider.position;
                overtakenRider.position = overtakenRiderNewPosition;
                console.log(`${riderName} overtook ${overtakenRider.name}!`);
            }
        }
        else if (command === "EngineFail") {

            const lapsLeft = cmd[2];
            rider.engineFail = true;
            console.log(`${riderName} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
        }
    }

    for (const finishedRider of riders.filter(r => r.engineFail !== true)) {
        
        console.log(`${finishedRider.name}`);
        console.log((`  Final position: ${finishedRider.position}`));
    }
}

solve(["3",
"Valentino Rossi|100|1",
"Marc Marquez|90|2",
"Jorge Lorenzo|80|3",
"StopForFuel - Valentino Rossi - 50 - 1",
"Overtaking - Marc Marquez - Jorge Lorenzo",
"EngineFail - Marc Marquez - 10",
"Finish"]);
console.log("_____________________________________________");
solve(["4",
"Valentino Rossi|100|1",
"Marc Marquez|90|3",
"Jorge Lorenzo|80|4",
"Johann Zarco|80|2",
"StopForFuel - Johann Zarco - 90 - 5",
"Overtaking - Marc Marquez - Jorge Lorenzo",
"EngineFail - Marc Marquez - 10",
"Finish"]);