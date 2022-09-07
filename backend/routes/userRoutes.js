const express = require('express')
const router = express.Router()

const {
    registerUser, 
    loginUser, 
    updateUser,
    deleteUser, 
    getLoggedIn 
} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')


// POST Requests
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/update', updateUser)
router.post('/delete', deleteUser)

// GET Requests
router.get('/getloggedin', protect, getLoggedIn)


module.exports = router