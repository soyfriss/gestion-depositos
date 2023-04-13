const { Op } = require('sequelize');
const { Supplier } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');

const getSuppliers = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        const options = { ...getPagination(page, size) };

        if (sort) {
            options.order = [JSON.parse(sort)];
        }

        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            const conditions = [];

            if (filterObj.name) {
                conditions.push({ name: { [Op.iLike]: `${filterObj.name}%` } });
            }
            if (filterObj.email) {
                conditions.push({ email: { [Op.iLike]: `${filterObj.email}%` } });
            }
            if (filterObj.phone) {
                conditions.push({ phone: { [Op.iLike]: `${filterObj.phone}%` } });
            }
            if (filterObj.status) {
                conditions.push({ status: { [Op.eq]: filterObj.status } });
            }

            options.where = { [Op.and]: conditions };
        }

        let suppliers = await Supplier.findAndCountAll(options);


        res.status(httpStatusCodes.OK).json(suppliers);
    } catch (error) {
        next(error)
    }
}

module.exports = { getSuppliers };
