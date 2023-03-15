const { Category, Product, CategoryProduct } = require('../db');

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

    // Products
    const products = [
        {
            name: 'Toner 226A',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            name: 'mouse USB',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        }
    ];

    await Product.bulkCreate(products);

    const categoryProduct = [
        {
            categoryId: 1,
            productId: 1
        },
        {
            categoryId: 2,
            productId: 1
        },
        {
            categoryId: 3,
            productId: 2
        }

    ]

    await CategoryProduct.bulkCreate(categoryProduct);
}
