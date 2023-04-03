const { body } = require('express-validator');
const constants = require('../../utils/constants');
const isValidDate = require('../../utils/is-valid-date');
const { Employee, Product } = require('../../db');

const validationRules = () => {
    return [
        body('documentDate')
            .trim()
            .not().isEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail()
            .custom(async (date) => {
                console.log('documentDate', date)
                if (!isValidDate(date)) {
                    return Promise.reject(constants.INVALID_DATA);
                }

                // TODO: Validate that this date is greater than or equal to the last document
            })
            .bail(),
        body('employeeId')
            .trim()
            .not().isEmpty().withMessage(constants.FIELD_REQUIRED)
            .isNumeric().withMessage(constants.INVALID_DATA)
            .bail()
            .custom(async (employeeId) => {
                const employee = await Employee.findByPk(employeeId);
                if (!employee) {
                    return Promise.reject(`${employeeId}: ${constants.ITEM_NOT_IN_LIST}`)
                }
            })
            .bail(),
        body('items')
            .custom(async (items) => {
                console.log('items to validate', items);
                // Check type
                if (!Array.isArray(items)) {
                    return Promise.reject(constants.INCORRECT_TYPE);
                }
                // At least one item is required
                if (items.length === 0) {
                    return Promise.reject(constants.FIELD_REQUIRED);
                }
                // Check each product and quantity
                for (const item of items) {
                    // Product Id type
                    if (typeof item.productId !== 'number') {
                        return Promise.reject(constants.INVALID_ITEM_IN_LIST);
                    }
                    // Check if product exists
                    const product = await Product.findByPk(item.productId);
                    if (!product) {
                        return Promise.reject(`${item.productId}: ${constants.ITEM_NOT_IN_LIST}`)
                    }

                    // Quantity
                    if (typeof item.quantity !== 'number') {
                        return Promise.reject(constants.INVALID_ITEM_IN_LIST);
                    }
                    if (item.quantity <= 0) {
                        return Promise.reject(constants.INVALID_DATA);
                    }
                }
            })
    ];
}

module.exports = validationRules;
