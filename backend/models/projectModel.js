const db = require('../config/db')

const Project = function(project) {
    this.title = project.title,
    this.description = project.description,
    this.status = project.status
}