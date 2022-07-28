const Users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailfunction = require('../utils/nodemail')
const { use } = require('../routes/userRoute')

 const Register = async (req, res) => {
    try {
        let {password, name, email} = req.body
        let user = await Users.findOne({email: email})
        if(user) {
            return res.status(400).json({error: 'user is existent'})
        }

        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        user = await Users.create({name, email, password})
        if(!user) {
            return res.status(400).json({error: 'user cannot be registered'})
        }
        const token = jwt.sign({_id: user._id}, process.env.private_key, {expiresIn: '1h'})
        
        res.status(200).json({
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            _id: user._id,
            token 
        })

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}
const Login = async (req, res) => {
    try {
        let {email, password} = req.body

        let user = await Users.findOne({email})

        if(!user) {
            return res.status(400).json({error: 'user not found'})
        }
        const iscorrect = await bcrypt.compare(password, user.password)
        if(!iscorrect) {
            return res.status(400).json({error: 'password is not authorized'})
        }
        const token = jwt.sign({_id: user._id}, process.env.private_key, {expiresIn: '1h'})
        res.status(200).json({
            name: user.name,
            email: user.email,
            _id: user._id,
            createAt: user.createdAt,
            updatedAt: user.updatedAt,
            token
        })


    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const forgotpassword = async (req, res) => {
   try {
    const {email} = req.body

    let user = await Users.findOne({email}).select('-password')
    if(!user) {
        return res.status(400).json({error: 'email not found'})
    }
    const tokentstring = user.forgotpassword()
    console.log(tokentstring)
    const url = `${req.protocol}://localhost:3000/forgetpassword/${tokentstring}`
    user.save({validateBeforeSave: false})
   await nodemailfunction({
        subject: 'forget your password',
        message: url,
        email: email
    })
   


    res.status(200).json({
        message: 'send link successfully',
        url: url
    })
   } catch (err) {
    res.status(400).json({error: err.message})
   }

}

const resetpasswordroute = async (req, res) => {
    try {
        const {tokenstring} = req.params
        console.log(req.params)
        const passwordtoken = crypto.createHash('sha256').update(tokenstring).digest('hex')

        let user = await Users.findOne({resetpasswordtoken: passwordtoken})

        if(!user) {
            return res.status(400).json({error: 'user not found'})
        }

        let currenttime = Date.now()
        let expiretime = user.resetpasswordexpire.getTime()
        console.log(currenttime)
        if(expiretime < currenttime) {
             return res.status(400).json({error: 'reset token expires'})
           
        } 
        user.resetpasswordexpire = undefined
        user.resetpasswordtoken = undefined
        user.save({validateBeforeSave: false})
        res.status(200).json(
           { 
            email: user.email,
            password: user.password, 
            name: user.name,
            updateAt: user.updatedAt,
            _id: user._id
        }
        )

    } catch (err) {
        res.status(200).json({error: err.message})
    }
}

const updatepassword = async (req, res) => {
    try {
        const {newpassword} = req.body

    const {userid} = req.params

    let user = await Users.findById(userid)
    if(!user) {
        return res.status(400).json({error: 'user not found'})
    }
    
    user.password = await user.createhashpassword(newpassword)
    let token = user.createtoken()
    user.save({validateBeforeSave: false})

    console.log(newpassword, user.password)

    res.status(200).json({
        email: user.email,
        name: user.name,
        updateAt: user.updatedAt,
        _id: user._id,
        token
    })
    } catch (err) {
        res.status(400).json({error: err.message})
    }
    


}


module.exports = {
    Register,
    Login,
    forgotpassword,
    resetpasswordroute,
    updatepassword
}