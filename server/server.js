const path = require('path')
const express = require('express')
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')

require('colors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(
    cors({
        origin: "http://localhost:3000",
    })
)

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve frontend

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))

} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}


const port = process.env.PORT
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}` .cyan.underline))
