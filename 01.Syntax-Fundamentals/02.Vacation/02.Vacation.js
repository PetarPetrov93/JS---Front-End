function vacationCalculator(numOfPeope, group, dayOfWeek){
    let totalPrice = 0;

    if (group === "Students") {
        if (dayOfWeek === "Friday") {
            totalPrice = numOfPeope * 8.45;
        }
        else if(dayOfWeek === "Saturday"){
            totalPrice = numOfPeope * 9.8;
        }
        else if(dayOfWeek === "Sunday"){
            totalPrice = numOfPeope * 10.46;
        }
    }
    else if (group === "Business") {
        if (dayOfWeek === "Friday") {
            totalPrice = numOfPeope * 10.9;
        }
        else if(dayOfWeek === "Saturday"){
            totalPrice = numOfPeope * 15.6;
        }
        else if(dayOfWeek === "Sunday"){
            totalPrice = numOfPeope * 16;
        }
    }
    else if (group === "Regular"){
        if (dayOfWeek === "Friday") {
            totalPrice = numOfPeope * 15;
        }
        else if(dayOfWeek === "Saturday"){
            totalPrice = numOfPeope * 20;
        }
        else if(dayOfWeek === "Sunday"){
            totalPrice = numOfPeope * 22.5;
        }
    }

    if (group === "Students" && numOfPeope >= 30) {
        totalPrice -= totalPrice * 0.15;
    }
    else if(group === "Business" && numOfPeope >= 100){
        let discount = (totalPrice / numOfPeope) * 10;
        totalPrice -= discount;
    }
    else if(group === "Regular" && (numOfPeope >= 10 && numOfPeope <= 20)){
        totalPrice -= totalPrice * 0.05;
    }

    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}
