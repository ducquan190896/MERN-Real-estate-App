const connectDB = require('./config/db')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const expressfileupload = require('express-fileupload')
const path = require('path')

dotenv.config({path: './backend/config/config.env'})

connectDB()
const app = express()
app.use(expressfileupload())
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));


const userRouter = require('./routes/userRoute')
const housingRouter = require('./routes/housingRoute')

app.use('/api/user', userRouter)
app.use('/api/house', housingRouter)


const PORT = process.env.PORT 

app.get(('/'), (req, res) => {
    res.status(200).json({message: 'welcome to housing app'})
})

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))