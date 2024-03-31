function roadRadar(speed, area){
    if (area == "motorway") {
        speedCheck(speed, 130);
    }
    else if(area == "interstate"){
        speedCheck(speed, 90);
    }
    else if(area == "city"){
        speedCheck(speed, 50);
    }
    else if(area == "residential"){
        speedCheck(speed, 20);
    }

}
function speedCheck(driverSpeed, speedLimit){

    if (driverSpeed <= speedLimit) {
        console.log(`Driving ${driverSpeed} km/h in a ${speedLimit} zone`);
    }
    else if(driverSpeed >= speedLimit && driverSpeed <= speedLimit+20){
        console.log(`The speed is ${driverSpeed-speedLimit} km/h faster than the allowed speed of ${speedLimit} - speeding`);
    }
    else if(driverSpeed >= speedLimit && driverSpeed > speedLimit+20 && driverSpeed <= speedLimit+40){
        console.log(`The speed is ${driverSpeed-speedLimit} km/h faster than the allowed speed of ${speedLimit} - excessive speeding`);
    }
    else{
        console.log(`The speed is ${driverSpeed-speedLimit} km/h faster than the allowed speed of ${speedLimit} - reckless driving`);
    }
}
