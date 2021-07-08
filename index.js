require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port=${process.env.PORT}`);
});