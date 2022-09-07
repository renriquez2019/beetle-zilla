const express = require('express')
const router = express.Router()

const { registerUser, updateUser, loginUser, getLoggedIn } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/update', updateUser)
router.post('/login', loginUser)

router.get('/getlogged', protect, getLoggedIn)

module.exports = router