const express = require('express')
const {errorHandler} = require('./middleware/errorMiddleware')

require('colors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.get('/home', (req, res) => {
    res.json({
        name: "Bill",
        age: 99
    })
})

const port = process.env.PORT
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}` .cyan.underline))
