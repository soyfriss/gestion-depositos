const { Op } = require('sequelize');
const { DeliveryNote, Employee } = require('../../db');
const { getPagination } = require('../../utils/utils');
const httpStatusCodes = require('../../utils/http-status-codes');

const getDeliveryNotes = async (req, res, next) => {
    try {
        const { page, size, sort, filter } = req.query;

        const options = {
            ...getPagination(page, size),
            include: [
                {
                    model: Employee,
                    attributes: ['id', 'firstname', 'lastname', 'filenumber']
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
            if (filterObj.employeeId) {
                conditions.push({ employeeId: { [Op.eq]: filterObj.employeeId } });
            }
            if (filterObj.documentNumber) {
                conditions.push({ documentNumber: { [Op.eq]: filterObj.documentNumber } });
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

        let deliveryNotes = await DeliveryNote.findAndCountAll(options);

        res.status(httpStatusCodes.OK).json(deliveryNotes);
    } catch (error) {
        next(error);
    }
};

module.exports = { getDeliveryNotes };

