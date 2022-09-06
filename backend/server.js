const express = require('express')
const mysql = require('mysql');
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const {errorHandler} = require('./middleware/errorMiddleware')

const db = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : 'beetle'
});

db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('Database Connected...');
});

const app = express()

app.get('/', (req, res) =>{
    const sql = 'SELECT display_name FROM users';

    db.query(sql, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
