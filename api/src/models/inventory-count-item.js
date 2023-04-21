const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('InventoryCountItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        inventoryCountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'InventoryCountId'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ProductId'
        },
        currentQty: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'CurrentQty'
        },
        realQty: {
            type: DataTypes.INTEGER,
            // defaultValue: 0,
            field: 'RealQty'
        },
        difference: {
            type: DataTypes.VIRTUAL,
            get() {
                return realQty - currentQty;
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
