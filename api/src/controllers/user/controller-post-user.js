const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
    try {
        var { username, password, role, status } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            password, 
            role, 
            status
        });
        res.status(httpStatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = { createUser };