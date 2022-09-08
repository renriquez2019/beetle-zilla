const express = require('express')
const router = express.Router()

const {
    addTicket,
    updateTicket,
    searchTicket,
    getOne
} = require('../controllers/ticketController')


// POST REQUESTS
router.post('/add', addTicket)

// GET REQUESTS
router.get('/search', searchTicket)
router.get('/get', getOne)

// PUT REQUESTS
router.put('/update', updateTicket)


module.exports = router