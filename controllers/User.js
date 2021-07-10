const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

class User {
    static async login(req, res) {
        const user = await userModel.findOne({
            include: ['role'],
            where: {
            email: req.body.email,
            password: req.body.password
        }});
        if (!user) {
            return res.status(401).json({
                status: 401,
                error: 'user/password invalid'
            })
        }
       const token= jwt.sign({
           user:{
               id:user.id,
               email: user.email,
               role: user.role.name
           }
       },process.env.JWT_SECRET);
        return res.json({
            token,
            admin: user.role.name === 'admin' 
        });
    }
}

module.exports = User;