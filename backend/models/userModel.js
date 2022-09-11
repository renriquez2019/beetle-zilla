const db = require('../config/db')

// constructor
const User = function(user) {
    this.display_name = user.display_name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.role = user.role;
    this.is_admin = user.is_admin;
}

// used for creation of new user
User.create = (new_user, result) => {
    db.query("INSERT INTO users SET ?", new_user, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null)
            return;
        }
        console.log("created user: ", {email: res.email, ...new_user});
        result(null, {email: res.email, ...new_user})
    });
};

// used for updating specified columns in row determined by email
User.update = (user_id, user, result) => {
    db.query(
        "UPDATE users SET display_name = ?, phone = ?, role = ? WHERE user_id = ?", 
        [user.display_name, user.phone, user.role, user_id], 
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

        console.log("updated user: ", {user_id: user_id, ...user });
        result(null, {user_id: user_id, ...user});
    });
}

User.findByCriteria = (criteria, key, result) => {
    db.query(`SELECT * FROM users WHERE ${criteria} = '${key}'`, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0])
            return;
        }
        else {
            result({kind: "not_found"}, null);
            return;
        }
    });
}

// method for deleting user instance from the database
User.remove = (user_id, result) => {
    db.query("DELETE FROM assign WHERE user_id = ?", user_id, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null)
            return;
        }
    })

    db.query("DELETE FROM users WHERE user_id = ?", user_id, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null)
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user: ", res.display_name);
        result(null, res);
    })
}

User.admin = (user_id, result) => {
    db.query("UPDATE users SET is_admin = 1 WHERE user_id = ?", user_id, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null)
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "redundant" }, null);
            return;
        }
        
        result(null, res[0])
    })
}

User.getProjects = (user_id, result) => {
    db.query("SELECT * FROM assign WHERE user_id = ?", user_id, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        
        console.log("projects: ", res);
        result(null, res)
    })
}

module.exports = User;