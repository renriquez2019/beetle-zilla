const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users/register
// access Public
const registerUser = asyncHandler(async (req, res) =>{
    const {display_name, email, phone, password, confirm_password} = req.body;

    // check if fields are correct
    if (!display_name || !email || !phone || !password || !confirm_password) {
        res.status(400).send("Please enter all fields")
        return;
    }

    // check if password is repeated correctly
    if (password != confirm_password) {
        res.status(400).send("Passwords do not match")
        return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // check if email is taken by existing user
    User.findByCriteria('email', email, (err, data) => {
        if (!err) {
           res.status(400).send("User already exists")
        } else if (err.kind === "not_found"){

            // create new user
            const new_user = new User({
                display_name: display_name,
                email: email,
                password: hashedPassword,
                role: 3,
                phone: phone,
                about: "This is a sample About Me, click 'Edit Profile' to change it"
            })
            
            User.create(new_user, (error, data) => {
                if (error) 
                    res.status(400).send("Some error occured while creating the user")
                else {
                    res.status(201).send(data);
                }
            });
        } else {
            res.status(400).send("user already exists");
        }
    });
})

// @desc Update user
// @route PUT /api/users/update
// access Public
const updateUser = asyncHandler( async(req, res) =>{

    User.findByCriteria('user_id', req.body.user_id, (error, data) => {
        if (error)
            res.status(404).send("User not found")
        else {
            const user = data;
            
            const altered_user = {
                display_name : req.body.display_name || user.display_name,
                phone : req.body.phone || user.phone,
                role : req.body.role || user.role,
                about : req.body.about || user.about
            }

            User.update(req.body.user_id, altered_user, (error, data) => {
                if (error) 
                    res.status(400).send("some error occured while updating the user")
                else {
                    res.status(201)
                    res.send(data)
                }
            })
        }
    })
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) =>{

    const {email, password} = req.body;
    console.log(email);

    // Check for user email
    User.findByCriteria('email', email, async (error, data) => {
        if (error)
            res.status(400).send("user not found")
        else {
            const user = data;
            console.log(user);

            if (user && await bcrypt.compare(req.body.password, user.password)) {
                res.status(200).json({ token: generateToken(user.user_id) })
            } else {
                console.log(await bcrypt.compare(password, user.password))
                res.status(400).send("Invalid credentials")
            }
        }
    })
})


// @desc    delete a user
// @route   DELETE /api/users/delete
// @access  PRIVATE
const deleteUser = asyncHandler(async (req, res) => {

    User.remove(req.body.user_id, (error, data) => {
        if (error) {

            if (error.kind === "not_found") {
                res.status(404).send({ message: `user not found: ${req.body.user_id}` });
            } else {
                res.status(500).send({ message: `user ${req.body.display_name} could not be deleted`});
            }

        } else {
            res.status(200).send({ message: `user ${req.body.display_name} was deleted succsessfully` })
        }
    });
})

// @desc    Get user data
// @route   PUT /api/users/admin
// @access  Private
const setAdmin = asyncHandler(async (req, res) => {

    User.admin(req.body.user_id, (error, data) => {
        if (error) {
            res.status(500).send({ message: `user ${req.body.user_id} could not be altered`});
            
        } else {
            if (!data)
                res.status(400).send({ message: `user already set to admin`});
            else
                res.status(200).send({ message: `user ${req.body.user_id} was made admin` })
        }
    })

})

// @desc    Get user data
// @route   GET /api/users/getloggedin
// @access  Private
const getLoggedIn = asyncHandler(async (req, res) => {
    console.log("authenticate user: ", req.user)
    res.status(200).json(req.user)
})

// @desc    Get array of project_ids
// @route   GET /api/users/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    
    User.getProjects(req.query.user_id, (error, data) => {
        if (error)
            res.status(400).send({message: "no users found"})
        else {
            let projects = [];

            data.map((row) => (
                projects.push(row.project_id)
            ))

            res.status(200).send(projects)
        }
    })
})

// @desc    Get user data
// @route   GET /api/users/get
// @access  Public
const findOne = asyncHandler(async (req, res) => {

    User.findByCriteria('user_id', req.query.user_id, (error, data) => {
        if (error)
            res.status(404).send({message: "no users found"})
        else
            res.status(200).send(data);
    })

})

const generateToken = (user_id) => {
    return jwt.sign({user_id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    setAdmin,
    getLoggedIn,
    getProjects,
    findOne
};