const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('DeliveryNote', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'EmployeeId'
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
        employeeSign: {
            type: DataTypes.STRING,
            field: 'EmployeeSign'
        },
        status: {
            type: DataTypes.ENUM('Completed', 'Canceled'),
            allowNull: false,
            field: 'Status'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}
