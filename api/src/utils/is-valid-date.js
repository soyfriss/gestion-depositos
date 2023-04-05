module.exports = function isValidDate(value) {
    let date = Date.parse(value);
    if (isNaN(date)) {
        return false;
    }
    else {
        return true;
    }
}
