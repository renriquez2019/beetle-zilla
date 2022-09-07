const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

const addProject = asyncHandler(async (req, res) =>{
    const {title, description} = req.body;

    if (!title || !description) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const new_project = new Project({
        title: title,
        description: description,
        status: 1
    })

    Project.create(new_project, (error, data) => {
        if (error) 
            res.status(400).send({ message: "Some error occured while creating the project" })
        else {
            res.status(201)
            res.send(data)
        }
    })
})

module.exports = {
    addProject
}