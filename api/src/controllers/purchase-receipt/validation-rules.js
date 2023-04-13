const { body } = require('express-validator');
const constants = require('../../utils/constants');
const isValidDate = require('../../utils/is-valid-date');
const { Supplier, Product, PurchaseReceipt } = require('../../db');

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
            })
            .bail(),
        body('documentNumber')
            .trim()
            .not().isEmpty().withMessage(constants.FIELD_REQUIRED)
            .bail(),
        body('supplierId')
            .trim()
            .not().isEmpty().withMessage(constants.FIELD_REQUIRED)
            .isNumeric().withMessage(constants.INVALID_DATA)
            .bail()
            .custom(async (supplierId) => {
                const supplier = await Supplier.findByPk(supplierId);
                if (!supplier) {
                    return Promise.reject(`${supplierId}: ${constants.ITEM_NOT_IN_LIST}`)
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

                    itemsErrors.push({});
                    itemNro++;
                }
            }),
    ];
}

module.exports = validationRules;
