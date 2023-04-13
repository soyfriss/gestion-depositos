const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('PurchaseReceiptItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        purchaseReceiptId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'PurchaseReceiptId'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ProductId'
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'Quantity'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
