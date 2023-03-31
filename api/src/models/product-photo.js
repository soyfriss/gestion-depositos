const { DataTypes } = require('sequelize');
require('dotenv').config();
const {
    IMAGE_URL
} = process.env;

module.exports = (sequelize) => {
    sequelize.define('ProductPhoto', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ProductId'
        },
        path: {
            type: DataTypes.STRING(300),
            allowNull: false,
            field: 'Path'
        },
        src: {
            type: DataTypes.VIRTUAL,
            get() {
                return IMAGE_URL + this.path;
            }
        }
    }, {
        timestamps: true,
        freezeTableNames: true
    })
}
