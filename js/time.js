//This file will contain logic to deal with timer ticking down 

// will be requested in .pug/HTML

const countDown = document.getElementById("countDown");
const arrivalEntry = document.getElementById("arrivalTime");

function getTimeDifference() {
    let currentTime = new Date();
    let arrivalTime = arrivalEntry.innerText;

    let arrivalTimeArray = arrivalTime.split(":");

    arrivalTimeArray.forEach(element => parseInt(element));

    let dateObject = new Date();
    dateObject.setHours(arrivalTimeArray[0],arrivalTimeArray[1],arrivalTimeArray[2], 0);

    let secondsDiff = ( dateObject.getTime() - currentTime.getTime())/1000;

    //works locally but not on heroku
    let renderDate = new Date(secondsDiff).toISOString().substr(11, 8);

    return renderDate

}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

countDown.innerText = "Loading..."

setInterval(() => {
    try {
        countDown.innerText = getTimeDifference();
    } catch(error) {
        console.log(error)
        countDown.innerText = "Error";
    }
}, 1000);