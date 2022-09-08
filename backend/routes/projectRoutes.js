const express = require('express')
const router = express.Router()

const {
    addProject,
    updateProject,
    searchProject,
    getAllActive,
    getUsers,
    getTickets,
    getOne
} = require('../controllers/projectController')

// POST REQUESTS
router.post('/add', addProject)

// GET REQUESTS
router.get('/search', searchProject)
router.get('/active', getAllActive)
router.get('/getusers', getUsers)
router.get('/gettickets', getTickets)
router.get('/get', getOne)

// PUT REQUESTS
router.put('/update', updateProject)

module.exports = router