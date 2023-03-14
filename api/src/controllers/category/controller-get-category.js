const { Category } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        let category = await Category.findByPk(id);

        res.status(httpStatusCodes.OK).json(category);
    } catch (error) {
        next(error);
    }
}

module.exports = { getCategory };
