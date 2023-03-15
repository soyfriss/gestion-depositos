const { Category } = require('../db');
const { Employee } = require('../db');

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
    ];

    await Employee.bulkCreate(employee);


}
