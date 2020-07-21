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

    //works locally but not on heroku
    //let renderDate = new Date(secondsDiff * 1000).toISOString().substr(11, 8);

    //different method
    let renderDate = new Date(secondsDiff * 1000).toLocaleTimeString();
    renderDate = setCharAt(renderDate, 1, "0");
    return renderDate

}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

countDown.innerText = "Loading..."

setInterval(() => {
    countDown.innerText = getTimeDifference();
}, 1000);