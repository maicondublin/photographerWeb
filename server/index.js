const express = require('express')//listing the routes
const app = express()
const cors = require('cors')//interpret 
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extend:false}))
app.use(routes)

module.exports = async(port) =>{
    app.listen(port)
    console.log('application running on '+port)
} 