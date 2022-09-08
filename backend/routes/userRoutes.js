const express = require('express')
const router = express.Router()

const {
    registerUser, 
    loginUser, 
    updateUser,
    deleteUser,
    setAdmin,
    getLoggedIn,
    getProjects,
    findOne
} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')


// POST Requests
router.post('/register', registerUser)
router.post('/login', loginUser)

// GET Requests
router.get('/getloggedin', protect, getLoggedIn)
router.get('/projects', getProjects)
router.get('/get', findOne)

// PUT Requests
router.put('/update', updateUser)
router.put('/admin', setAdmin)

// DELETE Requests
router.delete('/delete', deleteUser)

module.exports = router