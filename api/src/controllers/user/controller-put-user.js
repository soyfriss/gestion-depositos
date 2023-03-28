const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const bcrypt = require('bcrypt');

const editUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        var { username, password, role, status } = req.body;

        let user = await User.findByPk(id);
        
        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND});
        }
        if (password !== undefined) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
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