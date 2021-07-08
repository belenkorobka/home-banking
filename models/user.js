const { DataTypes } = require('sequelize');
const connection = require('../connection');

const model = connection.define(
    'users',
    {
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        dni: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.FLOAT
        },
        account: {
            type: DataTypes.STRING
        },
        roles_id: {
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false}
);

module.exports = model;