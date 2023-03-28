const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const createUser = async (req, res, next) => {
    try {
        const { username, password, role, status } = req.body;
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
