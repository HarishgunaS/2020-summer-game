//Using mongoose for the database and bycrypt for hashing the passwords
const mongoose = require("mongoose");
const bycrypt = require("bycrypt");

const Schema = mongoose.Schema;

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

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}
