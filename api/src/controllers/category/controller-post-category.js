const { Category } = require('../../db');
const httpStatusCodes = require('../../utils/http-status-codes');

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await Category.create({
            name
        });

        res.status(httpStatusCodes.OK).json(category);
    } catch (error) {
        next(error);
    }
}

module.exports = { createCategory };
