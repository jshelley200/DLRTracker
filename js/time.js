//This file will contain logic to deal with timer ticking down 

// will be requested in .pug/HTML

const countDown = document.querySelectorAll(".countDown");
//const arrivalEntry = document.getElementById("arrivalTime");

function getTimeDifference(timeElement) {
    let currentTime = new Date();
    let arrivalTime = timeElement.innerText;

    let arrivalTimeArray = arrivalTime.split(":");

    arrivalTimeArray.forEach(element => parseInt(element));

    let dateObject = new Date();
    dateObject.setHours(arrivalTimeArray[0],arrivalTimeArray[1],arrivalTimeArray[2], 0);

    let secondsDiff = ( dateObject.getTime() - currentTime.getTime())/1000;

    //works locally but not on heroku
    let renderDate = new Date(secondsDiff * 1000).toISOString().substr(11, 8);

    return renderDate
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

countDown[0].innerText = "Loading..."

setInterval(() => {
    updateTimes();
}, 1000);

function updateTimes() {
    for (let i = 0; i < countDown.length; i++){
        try {
            countDown[i].innerText = getTimeDifference(
                countDown[i].previousElementSibling.previousElementSibling
            );
        } catch(error) {
        console.log(error)
            countDown[i].innerText = "Error";
        }
    }
}
