const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel')


// @desc Create ticket
// @route POST /api/tickets/add
// access Public
const addTicket = asyncHandler(async (req, res) => {

    const {title, description, type, priority, status, project_id} = req.body;

    if (!title || !description || !type || !priority) {
        res.status(400)
        throw new Error('please add all fields')
    }

    Ticket.findByCriteria('title', title, (err, data) => {
        if (!err) {
            res.status(400).send({message: "ticket already exists"})
        } else if (err.kind === "not_found") {

            const new_ticket = new Ticket({
                title: title,
                description: description,
                type: type,
                priority: priority,
                status: 1,
                project_id: project_id,
                register_date: new Date()
            })

            Ticket.create(new_ticket, (error, data) => {
                if (error) 
                    res.status(400).send({ message: "some error occured while creating the project" })
                else {
                    res.status(201)
                    res.send(data)
                }
            });

        } else {
            res.status(400).send({message: "ticket already exists"});
        }
    })
})

// @desc Update ticket
// @route PUT /api/tickets/update
// access Public
const updateTicket = asyncHandler(async (req,res) => {

    Ticket.findByCriteria('ticket_id', req.body.ticket_id, (error, data) => {
        if (error)
            res.status(400).send({ message: "ticket not found"})
        else {
            const ticket = data;

            const altered_ticket = {
                title : req.body.title || ticket.title,
                description : req.body.description || ticket.description,
                type : req.body.type || ticket.type,
                priority : req.body.priority || ticket.priority,
            }

            Ticket.update(req.body.ticket_id, altered_ticket, (error, data) => {
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

// @desc Search for ticket
// @route GET /api/tickets/search
// access Public
const searchTicket = asyncHandler(async (req, res) => {

    const key = req.body.key

    Ticket.getAll(key, (error, data) => {
        if (error)
            res.status(400).send({message: "no tickets found"})
        else
            res.status(400).send(data)
        
    })
})

// @desc Get one instance of ticket
// @route GET /api/tickets/get
// access Public
const getOne = asyncHandler(async (req, res) => {

    Ticket.findByCriteria('ticket_id', req.body.ticket_id, (error, data) => {
        if (error)
            res.status(404).send({message: "no tickets found"})
        else
            res.status(200).send(data);
    })
})

module.exports = {
    addTicket,
    updateTicket,
    searchTicket,
    getOne
}