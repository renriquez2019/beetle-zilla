const db = require('../config/db')

const Project = function(project) {
    this.title = project.title,
    this.description = project.description,
    this.status = project.status
}

Project.create = (new_project, result) => {
    db.query("INSERT INTO projects SET ?", new_project, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
        }
        console.log("created project: ", {title: res.title, ...new_project});
        result(null, {title: res.title, ...new_project})
    });
}

Project.update = (title, project, result) => {
    db.query(
        "UPDATE projects SET title = ?, description = ? WHERE title = ?",
        [project.title, project.description, title],
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

module.exports = Project;