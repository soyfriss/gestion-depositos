const { DataTypes } = require('sequelize');

const StatusType = DataTypes.ENUM('Active', 'Disabled');

module.exports = { StatusType };
