const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password, role) {
    if(role===1) {
        const user=User.find({role:1});
        return user;
    } else {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        console.log("The value of auth",auth ,password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
}
    throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);

module.exports = User;