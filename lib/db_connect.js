// const mysql = require('mysql2');
const mongoose = require('mongoose');
console.log(process.env.MONGO_URL);
mongoose.connect(`${process.env.MONGO_URL}/my_project`, {
    useNewUrlParser: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

    
// const connect = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '12345678',
//     database: 'my_project',
// });

module.exports = mongoose;