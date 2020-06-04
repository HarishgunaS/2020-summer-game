//Code for /status router here

let express = require("express");

let router = express.Router();

router.get("/status",function(req,res){
    res.status(200);
    res.json({"status":"ok"});
})
//POST routers for sign up, login, logout and forgot passoword
router.post('/signup', function(req, res) {
    res.status(200);
    res.json({ 'status': 'ok' });
});

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