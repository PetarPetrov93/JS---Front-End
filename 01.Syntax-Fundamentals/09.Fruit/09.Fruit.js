function calculateCost(fruit, weighInGr, pricePerKg) {
    let weighInKg = weighInGr/1000;
    let totalPrice = weighInKg * pricePerKg;
    console.log(`I need $${totalPrice.toFixed(2)} to buy ${weighInKg.toFixed(2)} kilograms ${fruit}.`);
}
