
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("members", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nic: {
            type: DataTypes.STRING(10)
        },
        name: {
            type: DataTypes.STRING(1000)
        },
        address: {
            type: DataTypes.STRING(1000)
        },
        occupation: {
            type: DataTypes.STRING(1000)
        },
        date_of_join: {
            type: DataTypes.DATE
        },
        date_of_birth: {
            type: DataTypes.DATE
        },
        sex: {
            type: DataTypes.STRING(1)
        }
    },
    {timestamps: false});

};