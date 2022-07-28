const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please type your name']
    },
    email: {
        type: String,
        required: [true, 'please type your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please type your password']
    },
    isAdmint: {
        type: Boolean,
        default: false,
        required: true
    },
    resetpasswordtoken: {
        type: String
    },
    resetpasswordexpire: {
        type: Date
    }
}, {
    timestamps: true
})
userschema.methods.forgotpassword = function () {
    const tokenstring = crypto.randomBytes(20).toString('hex')

    this.resetpasswordtoken = crypto.createHash('sha256').update(tokenstring).digest('hex')
    this.resetpasswordexpire = Date.now() + (1000 * 60 * 60 )
    return tokenstring

}
userschema.methods.createhashpassword = async function (inputpassword) {
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(inputpassword, salt)
    return hashpassword
}
userschema.methods.createtoken = function () {
    console.log(this._id)
   const token = jwt.sign({_id: this._id}, process.env.private_key, {expiresIn: '1h'})
   return token
}

module.exports = mongoose.model('Users', userschema)