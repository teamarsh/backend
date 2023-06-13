const crypto = require('crypto');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const db = require('../lib/db_connect');
const findOrCreate = require('mongoose-find-or-create');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 60,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60,
    },
    email: {
        type: String,
        email: true,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        default: 1,
    },
    image: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
    c_password: {
        type: String,
        required: true,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

module.exports = User = mongoose.model("users", userSchema);

























// class User {
//     getAll(cb){
//         const dbQuery = "SELECT * FROM Users";
        
//         db.query(dbQuery, cb)
//     }
//     getUserBy(value, cb){
//         let dbQuery = "SELECT * FROM Users WHERE Email='"+value+"' OR Username='"+value+"';"
        
//         db.query(dbQuery, cb)

//     }

//     getUserById(value, cb){
//         let dbQuery = "SELECT * FROM Users WHERE id="+value
        
//         db.query(dbQuery, cb)

//     }


//     insert(username, name, surname, email, pass, r_pass, cb){
//         let dbQuery = "INSERT INTO Users(Username, Name, Surname, Email, Admin, Password, C_Password)";
        
//         dbQuery += "VALUES('" + username + "', '" + name + "', '" + surname + 
//                 "', '" + email + "', '" + 0 + "', '" + pass + "', '" + r_pass + "')";
//         db.query(dbQuery, cb)
        
//     }
// }

// module.exports = new User();