const express = require('express')
const router = express.Router()

const {
    addProject,
    updateProject,
    searchProject,
    getAllActive,
    getUsers,
    getTickets,
    getOne,
    assignUser,
    removeUser
} = require('../controllers/projectController')

// POST REQUESTS
router.post('/add', addProject)
router.post('/assign', assignUser)

// GET REQUESTS
router.get('/search', searchProject)
router.get('/active', getAllActive)
router.get('/getusers', getUsers)
router.get('/gettickets', getTickets)
router.get('/get', getOne)

// PUT REQUESTS
router.put('/update', updateProject)

// DELETE Requests
router.delete('/remove', removeUser)

module.exports = router