const { DataTypes } = require('sequelize');
const Status = require('../controllers/delivery-note/status-enum');

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
        ticketNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'TicketNumber'
        },
        employeeSign: {
            type: DataTypes.TEXT,
            field: 'EmployeeSign'
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
