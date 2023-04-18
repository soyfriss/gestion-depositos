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

                // TODO: Validate that this date is greater than or equal to the lastest document
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
                const itemsErrors = [];
                let itemNro = 1;
                for (const item of items) {
                    // Product Id type
                    if (typeof item.productId !== 'number') {
                        itemsErrors.push({
                            itemNro,
                            productId: constants.INVALID_ITEM_IN_LIST
                        });
                        return Promise.reject(itemsErrors);
                    }
                    // Check if product exists
                    const product = await Product.findByPk(item.productId);
                    if (!product) {
                        itemsErrors.push({
                            itemNro,
                            productId: constants.ITEM_NOT_IN_LIST
                        });
                        return Promise.reject(itemsErrors);
                    }
                    // Quantity
                    if (typeof item.quantity !== 'number') {
                        itemsErrors.push({
                            itemNro,
                            productId: constants.INVALID_ITEM_IN_LIST
                        });
                        return Promise.reject(itemsErrors);
                    }
                    if (item.quantity <= 0) {
                        itemsErrors.push({
                            itemNro,
                            quantity: constants.INVALID_DATA
                        });
                        return Promise.reject(itemsErrors);
                    }
                    // Check stock
                    if ((product.stock - item.quantity) < 0) {
                        itemsErrors.push({
                            itemNro,
                            quantity: constants.INSUFFICIENT_STOCK
                        });
                        return Promise.reject(itemsErrors);
                    }

                    itemsErrors.push({});
                    itemNro++;
                }
            })
            .bail(),
        body('employeeSign')
            .custom(async (employeeSign, { req }) => {
                // The employee sign is only required when there is no ticket number
                if (!employeeSign && !req.body.ticketNumber) {
                    return Promise.reject(constants.FIELD_REQUIRED);
                }
                console.log('employeeSign validation ok!');
            })
    ];
}

module.exports = validationRules;
