require('dotenv').config();
const Sequelize = require('sequelize');
// mysql://root:12345678@localhost:3306/music
const path = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const connection = new Sequelize(path);

connection.authenticate()
    .then(res => {
        console.log('DB connected!');
    })
    .catch(err => {
        console.log(err);
    });

module.exports = connection;