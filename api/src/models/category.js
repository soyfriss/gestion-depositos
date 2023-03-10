const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Category', {
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
        }
    }, {
        timestamps: true,
        freezeTableName: true
    });
}
