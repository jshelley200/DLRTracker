const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
    res.render("trains.pug");
});

router.post("/", (req, res) => {
    console.log("test");

    fetch("https://api.tfl.gov.uk/Mode/dlr/Arrivals?count=-1")
        .then((res) => res.json())
        .then((data) => {
            ///logic to return next train time with inputs of  arrival: req.body.arrival,  departure: req.body.departure data: json
            for (let entry in data) {
                if (
                    data[entry].stationName === req.body.departure &&
                    data[entry].destinationName === req.body.arrival
                ) {
                    //let time = parseISOString(expectedArrival);
                    //if (data[entry].stationName === "Stratford DLR Station" && data[entry].destinationName === "Stratford International DLR Station"){
                    res.render("trains.pug", {
                        data: parseISOString(data[entry]
                                            .expectedArrival)
                                            .toLocaleTimeString(),
                    });
                    return;
                }
            }
            res.render("trains.pug", {
                data: "There are no trains scheduled for this route",
            });
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
