const { Op } = require('sequelize');
const { InventoryCount, User } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');

const getInventoryCounts = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        const options = {
            ...getPagination(page, size),
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        }

        if (sort) {
            options.order = [JSON.parse(sort)];
        }

        if (filter && Object.keys(JSON.parse(filter)).length > 0) {
            const filterObj = JSON.parse(filter);
            const conditions = [];

            if (filterObj.id) {
                conditions.push({ id: { [Op.in]: filterObj.id } });
            }
            if (filterObj.userId) {
                conditions.push({ userId: { [Op.eq]: filterObj.userId } });
            }
            if (filterObj.date_gte) {
                conditions.push({ documentDate: { [Op.gte]: filterObj.date_gte } });
            }
            if (filterObj.date_lte) {
                conditions.push({ documentDate: { [Op.lte]: filterObj.date_lte } });
            }
            if (filterObj.status) {
                conditions.push({ status: { [Op.eq]: filterObj.status } });
            }

            options.where = { [Op.and]: conditions };
        }

        let inventoryCounts = await InventoryCount.findAndCountAll(options);

        res.status(httpStatusCodes.OK).json(inventoryCounts);
    } catch (error) {
        next(error);
    }
};

module.exports = { getInventoryCounts };
