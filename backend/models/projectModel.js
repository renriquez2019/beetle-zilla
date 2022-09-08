const db = require('../config/db')

const Project = function(project) {
    this.title = project.title;
    this.description = project.description;
    this.status = project.status;
}

Project.create = (new_project, result) => {
    db.query("INSERT INTO projects SET ?", new_project, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return
        }
        console.log("created project: ", {title: res.title, ...new_project});
        result(null, {title: res.title, ...new_project})
    });
}

Project.update = (project_id, project, result) => {
    db.query(
        "UPDATE projects SET description = ? WHERE project_id = ?",
        [project.description, project_id],
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

        console.log("updated project: ", {title: title, ...project });
        result(null, {title: title, ...project});
        })
}

Project.findByCriteria= (criteria, key, result) => {
    db.query(`SELECT * FROM projects WHERE ${criteria} = '${key}'`, (error, res) => {
        
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }

        if (res.length) {
            console.log("found project: ", res[0]);
            result(null, res[0])
            return;
        }
        result({ kind: "not_found"}, null);
    });
}

Project.getAll = (key, result) => {
    let sql = "SELECT * FROM projects";
    
    if (key) {
        sql += ` WHERE title LIKE '%${key}%' OR description LIKE '%${key}%';`;
    }

    db.query(sql, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }

        console.log("projects: ", res);
        result(null, res)
    })

}

Project.getAllActive = result => {
    db.query("SELECT * FROM projects WHERE status = 1", (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res)
            return;
        }
    })
}

Project.getUsers = (project_id, result) => {
    db.query("SELECT * FROM assign WHERE project_id = ?", project_id, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        
        console.log("users: ", res);
        result(null, res)
    });
}

Project.getTickets = (project_id, result) => {
    db.query("SELECT * FROM tickets WHERE project_id = ?", project_id, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        console.log("tickets: ", res);
        result(null, res)
    })
}

module.exports = Project;