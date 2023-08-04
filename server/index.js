const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

const appsRouter = require('./routes/apps-router')
app.use('/api', appsRouter)

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const apiPort = 4000
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))