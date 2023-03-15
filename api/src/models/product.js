const { DataTypes } = require('sequelize');
const { StatusType } = require('../utils/data-types');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'Name'
        },
        description: {
            type: DataTypes.STRING(500),
            field: 'Description'
        },
        stock: {
            type: DataTypes.INTEGER,
            field: 'Stock',
            defaultValue: 0
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
    }
    );
}
