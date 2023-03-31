require('dotenv').config();
const fs = require('fs');
const {
    IMAGE_PATH
} = process.env;

function deleteImage(fileName) {
    fs.unlink(IMAGE_PATH + fileName, (err) => {
        if (err) {
            throw err;
        }
    });
}

module.exports = deleteImage;
