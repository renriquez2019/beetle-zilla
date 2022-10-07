const { restart } = require('nodemon');
const db = require('../config/db')

// constructor
const Ticket = function(ticket) {
    this.title = ticket.title;
    this.description = ticket.description;
    this.type = ticket.type;
    this.priority = ticket.priority;
    this.status = ticket.status;
    this.project_id = ticket.project_id;
    this.user_id = ticket.user_id;
    this.register_date = ticket.register_date;
}

Ticket.create = (new_ticket, result) => {
    db.query("INSERT INTO tickets SET ?", new_ticket, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null)
            return;
        }
        console.log("created ticket: ", {title: res.title, ...new_ticket});
        result(null, {title: res.title, ...new_ticket})
    })
}

Ticket.update = (ticket_id, ticket, result) => {
    db.query(
        "UPDATE tickets SET title = ?, description = ?, type = ?, priority = ?, project_id = ?, user_id = ? WHERE ticket_id = ?",
        [ticket.title, ticket.description, ticket.type, ticket.priority, ticket.project_id, ticket.user_id, ticket_id],
        (error, res) => {
        if (error) {
            console.log(error);
            result(error, null)
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated ticket: ", {title: ticket_id, ...ticket });
        result(null, {title: ticket_id, ...ticket});
    });
}

Ticket.findByCriteria = (criteria, key, result) => {
    db.query(`SELECT * FROM tickets WHERE ${criteria} = '${key}'`, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }

        if (res.length) {
            console.log("found ticket: ", res[0]);
            result(null, res[0])
            return;
        }

        result({ kind: "not_found"}, null);
    });
}

Ticket.getAll = (key, result) => {
    let sql = "SELECT * FROM tickets";

    if (key) {
        sql += ` WHERE title LIKE '%${key}%' OR description LIKE '%${key}%'`;
    }

    db.query(sql, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }

        if (res.length) {
            console.log(res)
            result(null, res)
            return;
        }

        result({ kind: "not_found"}, null)
    
    })
}

Ticket.remove = (ticket_id, result) => {
    db.query(`DELETE FROM tickets WHERE ticket_id = ?`, ticket_id, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }

        console.log("deleted ticket");
        result(null, {ticket_id : ticket_id})
    })
}



module.exports = Ticket;