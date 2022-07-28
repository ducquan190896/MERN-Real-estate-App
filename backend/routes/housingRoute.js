const express = require('express')

router = express.Router()
const {createhouse, gethouses, gethousesbyuser, deletehouse, updatehouse, getsinglehouse } = require('../controller/housingController')
const {protection} = require('../middleware/authenticate')




router.route('/').post(protection, createhouse)
router.route('/').get(gethouses)
router.route('/user').get(protection, gethousesbyuser)
router.route('/:houseid').delete(protection, deletehouse)
router.route('/:houseid').put(protection, updatehouse)
router.route('/:houseid').get(getsinglehouse)


module.exports = router