const userModel = require('../models/user');

class CreateUser {
    static async create(req, res) {
        const user = userModel.findOne({where: {
            email: req.body.email,
            password: req.body.password
        }});
    }
}

module.exports = CreateUser;