const express = require("express");
const bodyParser = require("body-parser");
const DLRRouter = require("./routes/DLR");
const { sequelize } = require('./models');

const port = process.env.PORT || 3000

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));



//handles /trains router
app.use("/DLR", DLRRouter)

//root routers
app.get("/", (req, res) => {
    res.render("main.pug");
});

// 404 Middleware
app.use('/', (req,res,next) =>{
    next(404);
});

//Error Handler 404 / 500
app.use('/', (err, req, res, next) => {
    
    if (err === 404){
        
        res.render("error.pug", {errorCode: err})
    } else {
        res.status(500).send("Internal Server Error");
    }
    
});



sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    });
})

