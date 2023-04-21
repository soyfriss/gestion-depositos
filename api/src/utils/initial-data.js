const { Category, Employee, Product, CategoryProduct, User, ProductPhoto, DeliveryNote, DeliveryNoteItem, Supplier } = require('../db');

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
            currentQty: 10
        },
        {
            name: 'mouse USB',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            currentQty: 10
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
            password: '$2b$10$wXlcLjx9c6/5XoiPsv1R6uqVlU4r9Q9kwFGJi.TJtLIDwGOzW1r0e',
            role: 'Admin',
        },
        {
            username: 'frissone',
            password: '$2b$10$wXlcLjx9c6/5XoiPsv1R6uqVlU4r9Q9kwFGJi.TJtLIDwGOzW1r0e',
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
            employeeId: 2,
            documentDate: '2023-04-01',
            documentNumber: 4,
            employeeSign: 'asdfasdf',
            status: 'Completed'
        },
    ]

    await DeliveryNote.bulkCreate(deliveryNotes);

    // Delivery Notes items
    const deliveryNotesItems = [
        {
            deliveryNoteId: 1,
            productId: 1,
            quantity: 10
        },
        {
            deliveryNoteId: 2,
            productId: 2,
            quantity: 10
        }
    ]

    await DeliveryNoteItem.bulkCreate(deliveryNotesItems);

    const suppliers = [
        {
            name: 'Cluster',
            email: 'cluster@cluster.com',
            phone: '03400123456'
        }
    ]

    await Supplier.bulkCreate(suppliers);
}
