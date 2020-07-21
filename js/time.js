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
    dateObject.setHours(arrivalTimeArray[0])
    dateObject.setMinutes(arrivalTimeArray[1])
    dateObject.setSeconds(arrivalTimeArray[2])

    let secondsDiff = ( dateObject - currentTime)/1000;

    //convert seconds to countdown


    let renderDate = new Date(secondsDiff * 1000).toISOString().substr(11, 8);

    return renderDate

}

countDown.innerText = getTimeDifference()

setInterval(() => {
    countDown.innerText = getTimeDifference();
}, 1000);