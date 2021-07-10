const jwt = require('jsonwebtoken');
const shortuuid = require('short-uuid');
const userModel = require('../models/user');

class User {
    static async login(req, res) {
        const user = await userModel.findOne({
            include: ['role'],
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (!user) {
            return res.status(401).json({
                status: 401,
                error: 'user/password invalid'
            })
        }
        const token = jwt.sign({
            user: {
                id: user.id,
                email: user.email,
                role: user.role.name
            }
        }, process.env.JWT_SECRET);
        return res.json({
            token,
            admin: user.role.name === 'admin'
        });
    }

    static async create(req, res) {
        const {
            firstname,
            lastname,
            dni,
            email,
            password,
            role,
        } = req.body;
        if (!firstname || !lastname || !dni || !email || !password || !role){
            return res.status(422).json({
                status: 422,
                message: "You must complete all gaps before logging in"
            });
        };
        try {
            const account = shortuuid.generate(dni);
            const userCreated = await userModel.create(
                {
                    firstname, lastname, dni, email, password, role, account,amount:0
                },
                { 
                    fields: ['firstname', 'lastname', 'dni', 'email', 'password', 'roles_id', 'account', 'amount'] 
                }
            );
            return res.status(201).json({
                status: 201,
                message: "user created ok"
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }
}

module.exports = User;