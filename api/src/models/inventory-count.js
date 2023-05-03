const { DataTypes } = require('sequelize');
const Status = require('../controllers/inventory-count/status-enum');

module.exports = (sequelize) => {
    sequelize.define('InventoryCount', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'UserId'
        },
        documentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'DocumentDate'
        },
        status: {
            type: DataTypes.ENUM(Object.keys(Status)),
            allowNull: false,
            field: 'Status'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}
