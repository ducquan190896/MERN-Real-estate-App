const NodeGeocoder = require('node-geocoder')

const options = {
    provider: process.env.geocode_provider,
    httpAdapter: 'https',
    apiKey: process.env.geocode_key,
    formatter: null
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder