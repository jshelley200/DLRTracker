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

    let secondsDiff = Math.floor(( dateObject - currentTime)/1000);

    //works locally but not on heroku
    //let renderDate = new Date(Math.floor(secondsDiff) * 1000).toISOString().substr(11, 8);

    //new approach
    let seconds = secondsDiff % 60;
    let minutes = (secondsDiff - seconds)/60;
    if (minutes <= 9){
        minutes = '0' + minutes
    }
    if (seconds <= 9){
        seconds = '0' + seconds
    }
    
    let timeString = (minutes + ':' + seconds);

    return timeString;
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
            
            if (countDown[i].innerText === "00:01") {
                countDown[i].parentNode.parentNode.style.display = "none";
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