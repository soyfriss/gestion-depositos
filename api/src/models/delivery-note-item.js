const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('DeliveryNoteItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        deliveryNoteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'DeliveryNoteId'
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
