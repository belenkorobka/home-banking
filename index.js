require("dotenv").config();
const express = require("express");

const jwtMiddleware = require('./middlewares/jwt');

const UserController = require('./controllers/User');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// login
app.post('/login', UserController.login);

//Crear usuario
app.post('/user', UserController.create);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port=${process.env.PORT}`);
});