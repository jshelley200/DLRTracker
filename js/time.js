//This file will contain logic to deal with timer ticking down 



// will be request in pug/HTML

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

    let renderDate = new Date(null);
    renderDate.setSeconds(secondsDiff);
    return renderDate.toISOString().substr(11, 8);
}

countDown.innerText = getTimeDifference()

setInterval(() => {
    countDown.innerText = getTimeDifference();
}, 1000);