//Code for /status router here

let express = require("express");

let router = express.Router();

const asyncMiddleware = require("../middleware/asyncMiddleware");
const UserModel = require("../models/userModel");

router.get("/status",function(req,res){
    res.status(200);
    res.json({"status":"ok"});
})
//POST routers for sign up, login, logout and forgot passoword
router.post('/signup', asyncMiddleware( async (req, res, next) => {
    //Pulling name, email, pass, ID from the request body
    const { name, email, password, userID } = req.body;
    //and then pass them on as arg to the create function
    await UserModel.create({ email, password, name, userID });
    res.status(200).json({ 'status': 'ok' });
}));

router.post('/login', function(req, res){
    res.status(200);
    res.json({ 'status': 'ok' });
});

router.post('/logout', function(req, res, next){
    res.status(200);
    res.json({ 'status': 'ok' });
});

router.post('/token', function(req, res, next){
    res.status(200);
    res.json({ 'status': 'ok' });
});







//Exporting to be used in app.js

module.exports = router;