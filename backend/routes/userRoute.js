const express = require('express')
const router = express.Router()
const {Register, Login, forgotpassword, resetpasswordroute, updatepassword} = require('../controller/userController')

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/forgetpassword').post(forgotpassword)
router.route('/forgetpassword/:tokenstring').get(resetpasswordroute)
router.route('/updatepassword/:userid').put(updatepassword)



module.exports = router