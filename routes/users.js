const express = require('express');
const cors = require('cors');
const router = express.Router();
const users = require('../controllers/UsersController');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const passport = require('passport')


const upload = multer({
    dest: './uploads/'
})

router.use(cors())

process.env.SECRET_KEY = 'secret'
/* GET users listing. */
router.get('/', users.getAll);
router.get('/:id', users.getUserById);
router.post('/register', users.createUser);
router.post('/login', users.login);
router.get('/account', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        user: req.user
    })
});
router.post('/upload', passport.authenticate('jwt', { session: false }), upload.single('file'), (req, res) => {
    /*res.json({
        file: req.file,
        user: req.user
    })*/
    users.uploads
});


module.exports = router;
