const { Category } = require('../db');

module.exports = async () => {
    // Categories
    const categories = [
        {
            name: "Insumos"
        },
        {
            name: "Toners"
        },
        {
            name: "Periféricos"
        },
        {
            name: "Resmas"
        },
    ];

    await Category.bulkCreate(categories);

}
