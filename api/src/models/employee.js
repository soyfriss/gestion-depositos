const { DataTypes } = require('sequelize');

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
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'Status'
        },
    }, {
        timestamps: true,
        freezeTableName: true
    });
}
