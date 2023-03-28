const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getUserByUserName = async (req, res, next) => {
    try {
        const { username } = req.params;

        let user = await User.findOne({where:{username: username}});

        res.status(httpStatusCodes.OK).json(user);
        
    } catch (error) {
        next(error);
    }
}

module.exports = { getUserByUserName };
