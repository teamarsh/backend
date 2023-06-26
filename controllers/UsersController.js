/**
 * Users Controller
 * @module controllers/users
 * @author Arshak Gasparyan
 */
const Users = require('../models/UserModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');




exports.getAll = async (req, res, next)=>{
    const users = await Users.find({})
    res.json({users});
};

exports.getUserById = (req, res, next)=>{
    Users.findById(req.params.id, (err, data)=>{
        res.json(data);
    })    
};

// exports.getUser = (req, res, next) => {

// }

exports.createUser = (req, res) => {
    const userData = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        age: req.body.age,
        image: req.body.image,
        role: req.body.role,
        password: req.body.password,
        c_password: req.body.c_password
    }
    Users.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (req.body.password === req.body.c_password) {
                        userData.password = hash;
                        userData.c_password = hash;
                        Users.create(userData)
                            .then(user => {
                                var token = jwt.sign({
                                    id: user._id,
                                    username: user.username,
                                    email: user.email
                                }, "SuperSecRetKey", {
                                    expiresIn: 86400 // expires in 24 hours
                                  });
                                res.json({
                                    status: user.email + " registered",
                                    name: user.name,
                                    surname:  user.surname,
                                    email: user.email,
                                    age: user.age,
                                    token: token
                                })
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    } else {
                        res.json({
                            error: 'Confirm Password don\'t like Password' 
                        })
                    }
                    
                })
            } else {
                res.json({
                    error: 'User already exist:'
                })
            }
        })
        .catch(err => {
            res.send('error: ' + err,)
    })
    
};

exports.login = (req, res) => {
    const userData = {
        email: req.body.body.email,
        password: req.body.body.password
    }
    
    Users.findOne({
        email: req.body.body.email
    }).then(user =>{
        // console.log(userData.password);
        // console.log(user.password);
        if (user == null) {
            res.status(404).json({
                error: "email is uncorrect",
            })
            
        } else {
            bcrypt.compare(userData.password, user.password, (err, hash) => {                
                if (hash) {
                    var token = jwt.sign({
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }, "SuperSecRetKey", {
                        expiresIn: 86400 // expires in 24 hours
                      });
                    res.json({
                        status: "success",
                        name: user.name,
                        surname:  user.surname,
                        email: user.email,
                        age: user.age,
                        token: token
                    })
                } else {
                    res.status(403).json({
                        error: "password is wrong"
                    })
                }
            })
        }
    })
}

exports.uploads = (req, res) => {
    /*res.json({
        file: req.file,
        user: req.user
    })*/
    res.json({
        file: req.file,
        user: req.user
    })
}
