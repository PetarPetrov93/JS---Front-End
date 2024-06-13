function solve(input){
    const n = input.shift();
    let heroes = [];

    for (let i = 0; i < n; i++) {
        
        const [name, hp, bullets] = input.shift().split(" ");

        const newHero = {
            name,
            hp: Number(hp),
            bullets: Number(bullets),
        };

        heroes.push(newHero);
    }

    while (input[0] !== "Ride Off Into Sunset") {
        
        const [command, heroName, arg1, arg2] = input.shift().split(" - ");
        const hero = heroes.find(h => h.name === heroName);

        if (command === "FireShot") {
            if (hero.bullets > 0) {
                hero.bullets--;
                console.log(`${heroName} has successfully hit ${arg1} and now has ${hero.bullets} bullets!`);
            }
            else{
                console.log(`${heroName} doesn't have enough bullets to shoot at ${arg1}!`);
            }
        }
        else if (command === "TakeHit") {
            hero.hp -= Number(arg1);
            if (hero.hp > 0) {
                console.log(`${heroName} took a hit for ${arg1} HP from ${arg2} and now has ${hero.hp} HP!`);
            }
            else{
                heroes = heroes.filter(h => h.name !== heroName);
                console.log(`${heroName} was gunned down by ${arg2}!`);
            }
        }
        else if (command === "Reload") {
            if (hero.bullets < 6) {
                const reloadedBullets = 6 - hero.bullets;
                hero.bullets = Number(6);
                console.log(`${heroName} reloaded ${reloadedBullets} bullets!`);
            }
            else{
                console.log(`${heroName}'s pistol is fully loaded!`);
            }
        }
        else if (command === "PatchUp") {
            if (hero.hp === Number(100)) {
                console.log(`${heroName} is in full health!`);
            }
            else{

                const patch = hero.hp + Number(arg1);
                if (patch <= 100) {
                    hero.hp += Number(arg1);
                    console.log(`${heroName} patched up and recovered ${arg1} HP!`);
                }
                else{
                    const patchedBy = 100 - hero.hp;
                    hero.hp = Number(100);
                    console.log(`${heroName} patched up and recovered ${patchedBy} HP!`);
                }
            }
        }
    }
    
    for (const hero of heroes) {
        console.log(hero.name);
        console.log(`HP: ${hero.hp}`);
        console.log(`Bullets: ${hero.bullets}`);
    }
}

solve(["2",
"Gus 100 0",
"Walt 100 6",
"FireShot - Gus - Bandit",
"TakeHit - Gus - 100 - Bandit",
"Reload - Walt",
"Ride Off Into Sunset"
]);
console.log("\n-------------------------------------------\n");
solve(["2",
"Jesse 100 4",
"Walt 100 5",
"FireShot - Jesse - Bandit",
"TakeHit - Walt - 30 - Bandit",
"PatchUp - Walt - 20" ,
"Reload - Jesse",
"Ride Off Into Sunset"
]);
console.log("\n-------------------------------------------\n");
solve(["2",
"Gus 100 4",
"Walt 100 5",
"FireShot - Gus - Bandit",
"TakeHit - Walt - 100 - Bandit",
"Reload - Gus",
"Ride Off Into Sunset"
]);