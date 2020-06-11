//Using mongoose for the database and bycrypt for hashing the passwords
const mongoose = require("mongoose");
const bycrypt = require("bycrypt");

const Schema = mongoose.Schema;
//Schema includes email(uniquw), password, name, userID(unique) and highScore (initialized to0)
const UserSchema = new Schema({

    email:{
        type:String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    userID:{
        type: String,
        required: true,
        unique: true
    },
    highScore:{
        type: Number,
        default: 0
    }

});
//reference to the doc being saved
UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
//to check if right password is entered
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}
//model created here
const UserModel = mongoose.model('user', UserScema);
