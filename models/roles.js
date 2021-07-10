const { DataTypes } = require('sequelize');
const connection = require('../connection');

const model = connection.define(
    'roles',
    {
        name: {
            type: DataTypes.STRING
        }
    },
    {timestamps: false}
);

module.exports = model;