function solve(input){

    let baristaTotalCount = Number(input.shift());

    const staff = [];
    
    for (let i = 0; i < baristaTotalCount; i++) {
        
        const newBaristaData = input.shift().split(" ");

        let newBaristaName = newBaristaData[0];
        let newBaristaShift = newBaristaData[1];
        const newBaristaCoffeeTypes = newBaristaData[2].split(",");

        const barista = {
            name: newBaristaName,
            shift: newBaristaShift,
            coffeeTypes: newBaristaCoffeeTypes,
        };

        staff.push(barista);
        
    }

    while(input[0] !== "Closed"){
        
        const cmd = input.shift().split(" / ");
        let command = cmd[0];
        let baristaName = cmd[1];

        const currentBarista = staff.find(b => b.name === baristaName);
        
        if (command === "Prepare") {

            let baristaShift = cmd[2];
            let order = cmd[3];

            if (currentBarista && currentBarista.shift === baristaShift && currentBarista.coffeeTypes.includes(order)) {
                console.log(`${baristaName} has prepared a ${order} for you!`);
            }
            else{
                console.log(`${baristaName} is not available to prepare a ${order}.`);
            }

        }
        else if (command === "Change Shift") {
            
            let newShift = cmd[2];

            if (currentBarista) {

                currentBarista.shift = newShift;
                console.log(`${baristaName} has updated his shift to: ${newShift}`);
            }

        }
        else if (command === "Learn") {
            
            let newCoffeeType = cmd[2];

            if (currentBarista.coffeeTypes.includes(newCoffeeType)) {
                
                console.log(`${baristaName} knows how to make ${newCoffeeType}.`);
            }
            else{

                currentBarista.coffeeTypes.push(newCoffeeType);
                console.log(`${baristaName} has learned a new coffee type: ${newCoffeeType}.`);
            }

        }
    }

    for (const staffMemberToPrint of staff) {
        
        console.log(`Barista: ${staffMemberToPrint.name}, Shift: ${staffMemberToPrint.shift}, Drinks: ${staffMemberToPrint.coffeeTypes.join(", ")}`);
    }

}


solve(['3',
'Alice day Espresso,Cappuccino',
'Bob night Latte,Mocha',
'Carol day Americano,Mocha',
'Prepare / Alice / day / Espresso',
'Change Shift / Bob / night',
'Learn / Carol / Latte',
'Learn / Bob / Latte',
'Prepare / Bob / night / Latte',
'Closed'
]);

solve(['4',
'Alice day Espresso,Cappuccino',
'Bob night Latte,Mocha',
'Carol day Americano,Mocha',
'David night Espresso',
'Prepare / Alice / day / Espresso',
'Change Shift / Bob / day',
'Learn / Carol / Latte',
'Prepare / Bob / night / Latte',
'Learn / David / Cappuccino',
'Prepare / Carol / day / Cappuccino',
'Change Shift / Alice / night',
'Learn / Bob / Mocha',
'Prepare / David / night / Espresso',
'Closed']);
