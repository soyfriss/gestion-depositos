const constants = require('../../utils/constants');
const { existCategory } = require('./exist-category');

async function validateCategory(data) {
    try {

        console.log('data: ', data);

        // name
        if (!data.name) {
            return {
                name: constants.FIELD_REQUIRED,
            };
        }

        // name length
        if (data.name.length > 255) {
            return {
                name: constants.MAX_LENGTH_EXCEEDED,
            };
        }

        // check for categories with the same name
        if (await existCategory(data.name.trim(), data.id)) {
            return {
                name: constants.DUPLICATED_NAME,
            };
        }

        return '';
        // Enable the next 3 lines only for testing purposes
        // return {
        //     validationError: constants.VALIDATION_ERRORS
        // };
    } catch (error) {
        console.log('Validation error: ', error);
        return {
            validationError: constants.VALIDATION_ERRORS
        };
    }
}

module.exports = validateCategory;
