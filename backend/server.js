const express = require('express')
const connectDB = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware')

require('colors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

const port = process.env.PORT
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}` .cyan.underline))
