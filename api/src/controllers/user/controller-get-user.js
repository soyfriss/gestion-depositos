const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        let user = await User.findByPk(id);

        res.status(httpStatusCodes.OK).json(user);
        
    } catch (error) {
        next(error);
    }
}

module.exports = { getUser };
