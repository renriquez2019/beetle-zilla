const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const db = require('../config/db')


// @desc Register new user
// @route POST /api/users
// access Public
const registerUser = asyncHandler(async (req, res) =>{
    const {display_name, email, password, confirm_password} = req.body;

    if (!display_name || !email || !password || !confirm_password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const new_user = new User({
        display_name: display_name,
        email: email,
        password: hashedPassword,
        role: null,
        phone: null,
        is_admin: false
    })

    User.create(new_user, (error, data) => {

        if (error) {
            res.status(400).send({ message: "Some error occured while creating the user" })
        }
        else {
            res.status(201)
            res.send(data)
        }
    });
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) =>{

    const {email, password} = req.body;

    // Check for user email
    User.findByEmail(email, (error, data) => {
        if (error)
            res.status(400).send({ message: "User not found"})
        else {
            const user = data;
            if (user && (bcrypt.compare(password, user.password))) {
                res.json({ token: generateToken(user.email) })
            } else {
                res.status(400)
                throw new Error("Invalid creditials")
            }
        }
    })
})

// @desc Update user
// @route POST /api/users
// access Public
const updateUser = asyncHandler(async (req, res) =>{
    console.log(req.body);
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getLoggedIn = asyncHandler(async (req, res) =>{
    res.status(200).json(req.user)
})

const generateToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}



module.exports = {
    registerUser,
    updateUser,
    loginUser,
    getLoggedIn
};