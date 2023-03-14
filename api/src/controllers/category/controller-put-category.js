const { Category } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');
const constants = require('../../utils/constants');

const editCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        let category = await Category.findByPk(id);
        if (!category) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: constants.ITEM_NOT_FOUND});
        }

        await category.update({
            name
        });

        res.status(httpStatusCodes.OK).json(category);
    } catch (error) {
        next(error);
    }
}

module.exports = { editCategory };
