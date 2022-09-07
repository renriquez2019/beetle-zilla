const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : 'beetle'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Database connection successful")
})

module.exports = connection;