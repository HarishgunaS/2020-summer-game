//Code for /status router here

let express = require("express");
let router = express.Router();

let bodyParser      = require("body-parser");
let mongoose        = require("mongoose");
let passport        = require("passport");
let LocalStrategy   = require("passport-local");
let path            = require("path");


const asyncMiddleware = require("../middleware/asyncMiddleware");
let middleware        = require("../middleware/index");
const User = require("../models/userModel");

router.get("/status",function(req,res){
    res.send("It is working.")
})
//POST routers for sign up, login, logout and forgot passoword
router.post('/signup',function (req,res,next){
    console.log(req.body.username);
    console.log(req.body.password);
    User.register(new User({username:req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err.message);
        }else{
            console.log(user.username+ " has been added to database");
            passport.authenticate("local")(req,res,function () {
                console.log(user);
                res.redirect("/");

            })
        }
    })



});

router.post('/', passport.authenticate("local",{

    failureRedirect:"/login"}), (req,res)=>{
    console.log(req.body.username);
    res.render("index", {username: req.body.username});

}
);

router.post('/logout', function(req, res, next){
    req.logout();
    res.status(200);
    res.json({ 'status': 'ok' });
});
router.get('/logout', function (req, res){
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});
router.post('/token', function(req, res, next){
    res.status(200);
    res.json({ 'status': 'ok' });
});


router.get("/signup", function (req,res) {
    res.render("signup");

});

router.get("/login", function (req,res) {
    res.render("login");

});
router.get("/", middleware, function (req,res) {
    res.render("index");

});




//Exporting to be used in app.js

module.exports = router;