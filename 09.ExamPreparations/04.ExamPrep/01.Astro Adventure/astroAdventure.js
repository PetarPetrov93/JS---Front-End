function solve(input){

    const totalNumberOfAustronauts = input.shift();
    const austronauts = [];

    for (let i = 1; i <= totalNumberOfAustronauts; i++) {
        
        const [name, oxygen, energy] = input.shift().split(" ");

        const austronaut = {
            name,
            oxygen: Number(oxygen),
            energy: Number(energy),
        };

        austronauts.push(austronaut);
    }

    while(input[0] !== "End"){

        const [command, austronautName, argument1] = input.shift().split(" - ");

        const currAustronaut = austronauts.find(a => a.name === austronautName);

        if (command === "Explore") {
            if (currAustronaut.energy >= argument1) {

                currAustronaut.energy -= Number(argument1);
                console.log(`${austronautName} has successfully explored a new area and now has ${currAustronaut.energy} energy!`);
            }
            else{
                console.log(`${austronautName} does not have enough energy to explore!`);
            }
        }
        else if (command === "Refuel") {
            const initialEnergy = currAustronaut.energy;
            currAustronaut.energy += Number(argument1);
            if (currAustronaut.energy > 200) {
                currAustronaut.energy = 200;
            }
            console.log(`${austronautName} refueled their energy by ${currAustronaut.energy - initialEnergy}!`);
        }
        else if (command === "Breathe") {
            const initialOxygen = currAustronaut.oxygen;
            currAustronaut.oxygen += Number(argument1);
            if (currAustronaut.oxygen > 100) {
                currAustronaut.oxygen = 100;
            }
            console.log(`${austronautName} took a breath and recovered ${currAustronaut.oxygen - initialOxygen} oxygen!`);
        }
    }

    for (const austronaut of austronauts) {
        
        console.log(`Astronaut: ${austronaut.name}, Oxygen: ${austronaut.oxygen}, Energy: ${austronaut.energy}`);
    }
}

solve(['3',
'John 50 120',
'Kate 80 180',
'Rob 70 150',
'Explore - John - 50',
'Refuel - Kate - 30',
'Breathe - Rob - 20',
'End']);
console.log("__________________________________________________");
solve(['4',
'Alice 60 100',
'Bob 40 80',
'Charlie 70 150',
'Dave 80 180',
'Explore - Bob - 60',
'Refuel - Alice - 30',
'Breathe - Charlie - 50',
'Refuel - Dave - 40',
'Explore - Bob - 40',
'Breathe - Charlie - 30',
'Explore - Alice - 40',
'End']);