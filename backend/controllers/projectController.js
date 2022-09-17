const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel')


// @desc Create project
// @route POST /api/projects/add
// access Public
const addProject = asyncHandler(async (req, res) =>{
    const {title, description} = req.body;

    if (!title || !description) {
        res.status(400)
        throw new Error('please add all fields')
    }

    

    Project.findByCriteria('title', title, (err, data) => {
        if (!err) {
            res.status(400).send({message: "Project already exists"})
        } else if (err.kind === "not_found"){
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
            });
        } else {
            res.status(400).send({message: "project already exists"});
        }
    })
})

// @desc Update project
// @route PUSH /api/projects/update
// access Public
const updateProject = asyncHandler(async (req, res) => {

    Project.findByCriteria('title', req.body.title, (error, data) => {
        if (error)
            res.status(400).send({ message: "project not found"})
        else {
            const project = data;

            const altered_project = {
                description : req.body.description || project.description,
            }

            Project.update(req.body.title, altered_project, (error, data) => {
                if (error) 
                    res.status(400).send({ message: "some error occured while updating the project" })
                else {
                    res.status(201)
                    res.send(data)
                }
            })
        }
    })
})

// @desc Seach title and description with keyword
// @route GET /api/projects/search
// access Public
const searchProject = asyncHandler(async (req, res) => {

    const key = req.body.key
    
    Project.getAll(key, (error, data) => {
        if (error) 
            res.status(400).send({message: "no projects found"})
        else 
            res.status(400).send(data)
    })
})

// @desc Get all projects with active status
// @route GET /api/projects/active
// access Public
const getAllActive = asyncHandler(async (req, res) => {

    Project.getAllActive((error, data) => {
        if (error)
            res.status(400).send({message: "no active projects"})
        else 
            res.status(200).send(data)
    })
})

// @desc Get all user_ids in project
// @route GET /api/projects/getusers
// access Public
const getUsers = asyncHandler(async (req, res) => {

    let help = req.query.project_id;
    console.log("here", help)

    Project.getUsers(req.query.project_id, (error, data) => {
        if (error)
            res.status(400).send({message: "no users found"})
        else {
            let users = [];

            data.map((row) => (
                users.push(row.user_id)
            ))

            res.status(200).send(users);
        }
    })
})

// @desc Get all ticket_ids in project
// @route GET /api/projects/gettickets
// access Public
const getTickets = asyncHandler(async (req, res) => {

    Project.getTickets(req.query.project_id, (error, data) => {
        if (error)
            res.status(400).send({message: "no tickets found"})
        else {
            let tickets = [];

            data.map((row) => (
                tickets.push(row.ticket_id)
            ))

            res.status(200).send(tickets);
        }
    })
})

// @desc Get one project based on id
// @route GET /api/projects/active
// access Public
const getOne = asyncHandler(async (req, res) => {

    Project.findByCriteria('project_id', req.query.project_id, (error, data) => {
        if (error)
            res.status(404).send({message: "no projects found"})
        else
            res.status(200).send(data);
    })
})

module.exports = {
    addProject,
    updateProject,
    searchProject,
    getAllActive,
    getUsers,
    getTickets,
    getOne
}