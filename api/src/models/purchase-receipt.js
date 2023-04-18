const { DataTypes } = require('sequelize');
const Status = require('../controllers/delivery-note/status-enum');

module.exports = (sequelize) => {
    sequelize.define('PurchaseReceipt', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        supplierId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'SupplierId'
        },
        documentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'DocumentDate'
        },
        documentNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: 'DocumentNumber'
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