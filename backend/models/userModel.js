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
User.update = (email, user, result) => {
    db.query(
        "UPDATE users SET display_name = ?, phone = ?, role = ? WHERE email = ?", 
        [user.display_name, user.phone, user.role, email], 
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

        console.log("updated user: ", {email: email, ...user });
        result(null, {email: email, ...user});
    });
}

User.findByEmail = (email, result) => {
    db.query(`SELECT * FROM users WHERE email = '${email}'`, (error, res) => {
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
    });
}

User.remove = (email, result) => {
    db.query("DELETE FROM users WHERE email = ?", email, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null)
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with email: ", email);
        result(null, res);
    })
}

User.admin = (email, result) => {
    db.query("UPDATE users SET is_admin = 1 WHERE email = ?", email, (error, res) => {
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

module.exports = User;