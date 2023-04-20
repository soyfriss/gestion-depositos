const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const authenticatedUserId = req.user.dataValues.id;
        if (parseInt(id) !== authenticatedUserId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        let user = await User.findByPk(id);
        res.status(httpStatusCodes.OK).json(user);
        
    } catch (error) {
        next(error);
    }
}

module.exports = { getProfile };
