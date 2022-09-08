const express = require('express')
const router = express.Router()

const {
    addTicket,
    updateTicket,
} = require('../controllers/ticketController')


// POST REQUESTS
router.post('/add', addTicket)

// PUT REQUESTS
router.put('/update', updateTicket)


module.exports = router