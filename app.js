//to convert environment file to env variables
require("dotenv").config();

//Using express and bodyParser
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const routes = require("./routes/main");
// importing routes for viewing and submitting scores from secure.js
const secureRoutes = require("./routes/secure");
//Using mongoose for the database
const mongoose = require("mongoose");
//Setting up mongoose connection
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
});
mongoose.connection.on('connected', function () {
    console.log('Connected to Mongo!!!');
});
//**********************************************
//**********************************************
app.use(bodyParser.urlencoded({extended:false})); //no nested
app.use(bodyParser.json());

app.use("/",routes);

app.use("/", secureRoutes);
//Using middleware ****************************

app.use(function(req,res){
    res.status(404);
    res.json({message: '404 - Not Found'})
})


// Error Handling
app.use(function (error,req,res,next){
    res.status(error.status || 500);
    res.json({error:err});
})

app.listen(3000,function () {
    console.log("Server working.");

})