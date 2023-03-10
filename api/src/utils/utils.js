const getPagination = (page, size) => {
    const limit = size ? +size : null;
    const offset = page ? page * limit : page;

    return { limit, offset };
};

module.exports = {
    getPagination,
}
