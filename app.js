//To load environment variables
//Since code will be up on GitHub, we are storing mongoDB credentials as .env var
require("dotenv").config();

//NPM packages ===============================
let express         = require("express");
let app             = express();
let bodyParser      = require("body-parser");
let socket          = require("socket.io");
    //``````````````````````````````````````````````
    app.use(bodyParser.urlencoded({extended:true}));
    //``````````````````````````````````````````````

let mongoose        = require("mongoose");
let passport        = require("passport");
let LocalStrategy   = require("passport-local");
//--------------------------------------------
// _requiring and using express session_
    app.use(require("express-session")({

        secret: "Harish please cum",
        resave: false,
        saveUninitialized: false

    }));
//=============================================

//Mongoose model created in /models/userModel

let User = require("./models/userModel")

//Configuring passport ===================

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================================
app.set("view engine", "ejs");
console.log(__dirname +"/src");
app.use("/src",express.static("src"));
app.use("/src",express.static("src"));
app.use("/css",express.static("css"));
app.use("/assets",express.static("assets"));
app.use("/game_chat",express.static("game_chat"));






const routes = require("./routes/main");
// importing routes for viewing and submitting scores from secure.js
const secureRoutes = require("./routes/secure");
//Using mongoose for the database

//Setting up mongoose connection
// // const uri = process.env.MONGO_CONNECTION_URL;
// mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true });
// mongoose.connection.on('error', (error) => {
//     console.log(error);
//     process.exit(1);
// });
mongoose.connection.on('connected', function () {
    console.log('Connected to Mongo!!!');
});
//**********************************************
//**********************************************
mongoose.connect("mongodb+srv://rish-game_20:FktUQpBaMITnOmUm@cluster0-7giqd.mongodb.net/test?retryWrites=true&w=majority");


//Refactoring the routes

app.use("/",routes);

app.use("/", secureRoutes);
//Using middleware ****************************

// app.use(function(req,res){
//
//     res.send("Not connected to any routes");
// })


// Send error message in case there is any error
app.use(function (error,req,res,next){
    res.send("Error");
    console.log(error.message)

})

//localhost:3000 is being used for testing purpose
//Harish knows the port of the deployment program

let server = app.listen(3000,function () {
    console.log("Server working.");

});

//Backend CHAT program
//chat program listening to port 3000
let io = socket(server);
io.on("connection", function (socket) {
    console.log("SOCKET WORKING !!Connection made:"+socket.id);


    socket.on("chat", function (mssgObject) {
        console.log("this works");
        io.sockets.emit('chat', mssgObject)

    })
})