const express = require('express')
const router = express.Router()

const {
    addTicket,
    updateTicket,
    searchTicket,
    getOne,
    toggleTicket,
    deleteTicket
} = require('../controllers/ticketController')


// POST REQUESTS
router.post('/add', addTicket)
router.post('/toggle', toggleTicket)

// GET REQUESTS
router.get('/search', searchTicket)
router.get('/get', getOne)

// PUT REQUESTS
router.put('/update', updateTicket)

// DELETE REQUESTS
router.delete('/delete', deleteTicket)


module.exports = router