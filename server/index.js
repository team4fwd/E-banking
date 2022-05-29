const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const router = require('./routers')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI 



try {
    mongoose.connect(MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
    },
      function(err){if(err){console.log('Error Connection')}else{console.log('Data Base Connected')}}
    )
} catch (error) {
    handleError(error);
}
  
app.use(cors())
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)



app.listen(PORT,()=>{
  console.log(`Server run on Port ${PORT}`)
})
