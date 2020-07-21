const express = require("express");
const bodyParser = require("body-parser");
const trainsRouter = require("./routes/trains");

const port = process.env.PORT || 3000

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

//handles /trains router
app.use("/trains", trainsRouter)

//root routers
app.get("/", (req, res) => {
    res.render("main.pug");
});




app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});


