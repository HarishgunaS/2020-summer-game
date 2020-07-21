//To check if the user is logged in

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/signup");
    //    And render the login form again
    }
};

module.exports = isLoggedIn;