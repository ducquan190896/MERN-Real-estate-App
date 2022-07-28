const mongoose = require('mongoose')
const geocoder = require('../utils/geolocation')

const houseschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    type: {
        type: String,
        required: true,
        default: 'rent',
        enum: ['rent', 'sell']
    },
    regularprice: {
        type: Number,
        required:  true,
        min: 1
    },
    parking: {
        type: Boolean,
        required: true,
        default: false
    },
    offer: {
        type: Boolean,
        required: true,
        default: false
    },
    discountedprice: {
        type: Number
    },
    bathroom: {
        type: Number,
        required: true,
        min: 1
    },
    bedroom: {
        type: Number,
        required: true,
        min: 1
    }, 
    furnished: {
        type: Boolean,
        required: true,
        default: true
    },
    latitude: {
        type: Number
    },
    longtitude: {
        type: Number
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    location: {
        type: String,
        required: true
    },
    propertyname: {
        type: String,
        required: true
    }
})

// houseschema.statics.locationconvert = async function () {

//     const geolocation = await geocoder.geocode(`${this.location} ${this.city} ${this.country}`)
//     // console.log(geolocation)
//     this.latitude = geolocation[0].latitude
//     this.longtitude = geolocation[0].longitude
//     console.log('hello', this.latitude, this.longtitude)
// }
houseschema.pre('save', async function() {
    // this.constructor.locationconvert()
    // console.log('add longtitude and latitude')
    const geolocation = await geocoder.geocode(`${this.location} ${this.city} ${this.country}`)
    // console.log(geolocation)
    this.latitude = geolocation[0].latitude
    this.longtitude = geolocation[0].longitude
    console.log('hello', this.latitude, this.longtitude)

})

module.exports = mongoose.model('Houses', houseschema)