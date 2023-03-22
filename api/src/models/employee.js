const { DataTypes } = require('sequelize');
const { StatusType } = require('../utils/data-types');

module.exports = (sequelize) => {
    sequelize.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'FirstName'
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'LastName'
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
        filenumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'FileNumber'
        },
        status: {
            type: StatusType, 
            allowNull: false,
            defaultValue: 'Active',
            field: 'Status'
        }
    }, {
        timestamps: true,
        freezeTableName: true
    });
}
