require('dotenv').config();
const fs = require('fs');
const {
    IMAGE_PATH
} = process.env;

function saveImage(baseImage, fileName) {
    const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const filename = `${fileName}.${ext}`;

    // //Check that if directory is present or not.
    if (!fs.existsSync(IMAGE_PATH)) {
        fs.mkdirSync(IMAGE_PATH);
    }

    fs.writeFileSync(IMAGE_PATH + filename, base64Data, 'base64');
    return filename;
}

module.exports = saveImage;
