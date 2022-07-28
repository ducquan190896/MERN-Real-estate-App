const Users = require('../model/userModel') 
const Houses = require('../model/housingmodel')
const path = require('path')

const createhouse = async(req, res) => {
    try {
        console.log(req.files, req.body, 'hello')
        let imagefiles = req.files.imagefile
        imagefiles.forEach(image => {
            if(!image.mimetype.startsWith('image')) {
                    return res.status(400).json({error: 'fileupload is not image'})
            }
            if(image.size > 1000000) {
                return res.status(400).json({error: 'fileupload size is too large'})
            }
        })
        const imagefilemv = []
       await imagefiles.forEach(image => {
            // console.log(image)
           image.mv(`./backend/public/upload/${image.name}`, (err) => {
                if(err) {
                    console.log(err.message)
                    return err.message
                }
                const filepath = `upload/${image.name}`
                
                console.log(filepath)
                // imagefilemv.push(`${filepath}`)
                
                // console.log(imagefilemv)
                
            })
            imagefilemv.push(`upload/${image.name}`)
        })
        
        const {type, regularprice, parking, offer, discountedprice, bathroom, bedroom, furnished, city, country,  location, propertyname} = req.body
        const reqobject = {
            type, 
            regularprice,
            parking, 
            offer,
            discountedprice,
            bathroom,
            bedroom,
            furnished,
            city,
            country,
             
            location,
            propertyname,
            image: imagefilemv,
            user: req.user._id
        }
        const house = await Houses.create(reqobject)
        if(!house) {
            return res.status(400).json({error: 'house cannot be created'})
        }
        // house.locationconvert()
        // house.save({validateBeforeSave: false})
        
        // console.log(imagefilemv, house)
        res.status(200).json(house)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}


const gethouses = async (req, res) => {
    try {
        const houses = await Houses.find({}) 
        if(!houses) {
            return res.status(400).json({error: 'hourses not found'})
        }
        res.status(200).json(houses)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const gethousesbyuser = async (req, res) => {
    try {
        const houses = await Houses.find({user: req.user._id})
        if(!houses) {
            return res.status(400).json({error: 'houses not found'})
        }
        res.status(200).json(houses)
    } catch (err) {
        res.status(200).json({error: err.message})
    }
}
const getsinglehouse = async (req, res) => {
    try {
        const {houseid} = req.params
        const houses = await Houses.findById(houseid)
        if(!houses) {
            return res.status(400).json({error: 'houses not found'})
        }
        res.status(200).json(houses)
    } catch (err) {
        res.status(200).json({error: err.message})
    }
}

const deletehouse = async (req, res) => {
    try {
        const {houseid} = req.params
        const house = await Houses.findById(houseid)
        if(!house) {
            return res.status(400).json({error: 'house not found'})
        }
        if(house.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({error: 'not authorized to delete house'})
        }
        house.remove()
        res.status(200).json({message: 'house is deleted successfully'})

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const updatehouse = async (req, res) => {
    try {
        
        const {houseid} = req.params
        console.log(houseid, req.body)
        let house = await Houses.findById(houseid)
        if(!house) {
            return res.status(400).json({error: 'house not found'})
        }
        console.log(house)

        if(house.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({error: 'user is not authorized to edit house'})
        }
        house =  await Houses.findByIdAndUpdate(houseid, {...req.body}, {new: true})
        console.log(house)

        res.status(200).json(house)

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    createhouse,
    gethouses,
    gethousesbyuser,
    deletehouse,
    updatehouse,
    getsinglehouse
}