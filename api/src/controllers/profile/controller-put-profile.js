const { User } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const bcrypt = require('bcrypt');

const editProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        var { username, passwordEdit} = req.body;

        let user = await User.findByPk(id);
        
        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND});
        }
        
        if (passwordEdit !== undefined) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(passwordEdit, salt);
            await user.update({
                username,
                password
            });
        } else {
            await user.update({
                username
            });
        }

        res.status(httpStatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = { editProfile };