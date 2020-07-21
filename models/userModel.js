//Using mongoose for the database
let mongoose = require("mongoose");

let passportLocalMongoose = require("passport-local-mongoose");



//Schema includes email(unique), password, name, userID(unique) and highScore (initialized to0)
const UserSchema = new mongoose.Schema({




    username:String,
    password:String,

    highScore:{
        type: Number,
        default: 0
    }

});
//Adding passport-local-mogoose methods to UserSchema
UserSchema.plugin(passportLocalMongoose);


//User model, with 5 objects, 1 middleware and 1 method being exported
module.exports = mongoose.model('user', UserSchema);
