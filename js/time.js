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
    let renderDate = new Date(Math.floor(secondsDiff) * 1000).toISOString().substr(11, 8);
    //let renderDate = Math.floor(secondsDiff);

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
            let timeElement = countDown[i].previousElementSibling.previousElementSibling;
            
            if (countDown[i].innerText === "00:00:01") {
                Location.reload();
            } else {
                countDown[i].innerText = getTimeDifference(timeElement);
            }    

        } catch(error) {
        console.log(error)
            countDown[i].innerText = "Error";
        }
    }
}


//need to fix reload on countdown finishing