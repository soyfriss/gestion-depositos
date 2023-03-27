const { DataTypes } = require('sequelize');
const { StatusType } = require('../utils/data-types');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'UserName'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'Password'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'Email'
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            field: 'Role'
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
