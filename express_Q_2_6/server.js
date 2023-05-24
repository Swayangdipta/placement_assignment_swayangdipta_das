require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 9000

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL).then((res)=>{
    console.log(`DATABASE CONNECTED.`);
}).catch(err => {
    console.log(err);
})

app.use('/api',authRoutes)

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}...`);
})