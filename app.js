const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("main.pug");
});

app.get("/trains", (req, res) => {
    res.render("trains.pug");
});
//handles post of train stations from form to /trains
app.post("/trains", (req, res) => {
    console.log("test");
    //retrive next ratin using req.body.departure and req.body.arrival

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
                        data: parseISOString(data[entry].expectedArrival).toLocaleTimeString()
                    });
                    return;
                }
            }
            res.render("trains.pug", { data: "There are no trains scheduled for this route" });
        })
        .catch((err) => {
            res.send(err);
            res.redirect("/");
        });

    // res.render("trains.pug", {
    //     arrival: req.body.arrival,   ///arrival for now but will be nex train
    //     departure: req.body.departure,
    // });
});

app.listen(3001, () => {
    console.log("Server listening on localhost:3001");
});

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
