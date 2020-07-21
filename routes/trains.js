const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
    res.render("trains.pug");
});

router.post("/", (req, res) => {
    console.log("test");

    fetch("https://api.tfl.gov.uk/Mode/dlr/Arrivals?count=3")
        .then((res) => res.json())
        .then((data) => {
            let departureArray = [];
            ///logic to return next train time with inputs of  arrival: req.body.arrival,  departure: req.body.departure data: json
            for (let entry in data) {
                if (data[entry].stationName === req.body.departure) {
                    
                    let departureTime = parseISOString(data[entry]
                                            .expectedArrival)
                                            .toLocaleTimeString();
                    let destination = data[entry].destinationName;

                    let departure = data[entry].stationName;
                    
                    //this pushes the depature time values and destination values in an array that is passed to pug file to retreive data using array index
                    departureArray.push( [departureTime,destination,departure] );
                }
            }
            if (departureArray.length > 0){
                res.render("trains.pug", { data: departureArray});
                
            } else{
                res.render("trains.pug", { data: "There are no trains scheduled for this route"});
            }
        })
        .catch((err) => {
            res.send(err);
            res.redirect("/");
        });
});

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

module.exports = router;


// .then((data) => {
//     ///logic to return next train time with inputs of  arrival: req.body.arrival,  departure: req.body.departure data: json
//     for (let entry in data) {
//         if (
//             data[entry].stationName === req.body.departure &&
//             data[entry].destinationName === req.body.arrival
//         ) {
//             //let time = parseISOString(expectedArrival);
//             //if (data[entry].stationName === "Stratford DLR Station" && data[entry].destinationName === "Stratford International DLR Station"){
//             res.render("trains.pug", {
//                 data: parseISOString(data[entry]
//                                     .expectedArrival)
//                                     .toLocaleTimeString(),
//             });
//             return;
//         }
//     }
//     res.render("trains.pug", {
//         data: "There are no trains scheduled for this route",
//     });
// })