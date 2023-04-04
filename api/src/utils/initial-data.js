const { Category, Employee, Product, CategoryProduct, User, ProductPhoto, DeliveryNote } = require('../db');

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

    // Employee
    const employee = [
        {
            firstname: "Nicolás",
            lastname: "Rotili",
            email: "rotilinicolas@gmail.com",
            phone: "3364372952",
            filenumber: "2680"
        },
        {
            firstname: 'Federico',
            lastname: 'Rissone',
            email: 'frissone@villaconstitucion.gov.ar',
            phone: '336123456',
            filenumber: '1234'
        }
    ];

    await Employee.bulkCreate(employee);

    // Products
    const products = [
        {
            name: 'Toner 226A',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stock: 10   // To test Delivery Notes
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

    // Product photos
    const productPhoto = [
        {
            productId: 1,
            path: '1-1.jpeg'
        },
        {
            productId: 2,
            path: '2-2.jpeg'
        }
    ]

    await ProductPhoto.bulkCreate(productPhoto);

    // Users
    const users = [
        {
            username: 'nrotili',
            password: '123456789',
            role: 'Admin',
        },
        {
            username: 'frissone',
            password: '123456789',
            role: 'Admin',
        },
    ]

    await User.bulkCreate(users);

    // Delivery Notes
    const deliveryNotes = [
        {
            employeeId: 1,
            documentDate: '2023-03-10',
            documentNumber: 1,
            employeeSign: 'asdfasdf',
            status: 'Completed'
        },
        {
            employeeId: 1,
            documentDate: '2023-03-30',
            documentNumber: 2,
            employeeSign: 'asdfasdf',
            status: 'Completed'
        },
        {
            employeeId: 1,
            documentDate: '2023-03-31',
            documentNumber: 3,
            employeeSign: 'asdfasdf',
            status: 'Canceled'
        },
        {
            employeeId: 2,
            documentDate: '2023-04-01',
            documentNumber: 4,
            employeeSign: 'asdfasdf',
            status: 'Completed'
        },
        {
            employeeId: 2,
            documentDate: '2023-04-01',
            documentNumber: 5,
            employeeSign: 'asdfasdf',
            status: 'Canceled'
        },
    ]

    await DeliveryNote.bulkCreate(deliveryNotes);
}
