const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const editUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, role, status } = req.body;

        let user = await User.findByPk(id);
        
        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND});
        }

        if (password !== null) {
            await user.update({
                username,
                password, 
                role, 
                status
            });
        } else {
            await user.update({
                username, 
                role, 
                status
            });
        }

        res.status(httpStatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = { editUser };