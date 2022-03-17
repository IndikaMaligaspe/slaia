const {DataTypes} = require('sequelize');

module.exports =   (sequelize) => {
        sequelize.define("memberPaymentHistory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        member_id: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING(1000)
        },
        ammount: {
            type: DataTypes.DOUBLE(6,2)
        },
        reciept_no: {
            type: DataTypes.STRING(1000)
        },
        date_of_payment: {
            type: DataTypes.DATE
        },
        remarks: {
            type: DataTypes.STRING(1000)
        }
    },
    {tableName: 'member_payment_history'},
    {timestamps: false});
};