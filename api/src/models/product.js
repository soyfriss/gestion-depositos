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
        currentQty: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'CurrentQty'
        },
        lastQtyCountDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'LastQtyCountDate'
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
