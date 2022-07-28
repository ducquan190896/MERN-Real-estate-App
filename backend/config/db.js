const mongoose = require('mongoose')

// const connectDB = async () => {
//     try {
//         const coon = await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         console.log(`mongodb connected: ${coon.connection.host}`)
//     } catch  (err) {
//         console.log(`err: ${err.message}`)
//         process.exit(1)
//     }
// }

// module.exports = connectDB

const connectDB = async () => {
    try {
        const coon = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        })

        console.log(`mongodb connected : ${coon.connection.host}`)
    } catch (err) {
        console.log(`error: ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectDB