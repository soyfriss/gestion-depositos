const { DataTypes } = require('sequelize');
const { StatusType } = require('../utils/data-types');

module.exports = (sequelize) => {
    sequelize.define('Supplier', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'Name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'Email'
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'Phone'
        },
        status: {
            type: StatusType, 
            allowNull: false,
            defaultValue: 'Active',
            field: 'Status'
        },
    }, {
        timestamps: true,
        freezeTableName: true
    });
}
