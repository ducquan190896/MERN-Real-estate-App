const jwt = require('jsonwebtoken')
const Users = require('../model/userModel')

const protection = async (req, res, next) => {
    try {
        let token
        if(!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')) {
            return res.status(400).json({error: 'not authorized'})
        }
        token =  req.headers.authorization.split(' ')[1]
        console.log(token)
        const decode = jwt.verify(token, process.env.private_key)
        if(!decode) {
            return res.status(400).json({error: 'not authorized '})
        }
        const user = await Users.findById(decode._id)
        if(!user){
            return res.status(400).json({json: 'user not found'})
        }
        req.user = user
        next()
    } catch (err) {
        res.status(400).json({error: 'error in running server'})
    }
}

module.exports = {
    protection
}