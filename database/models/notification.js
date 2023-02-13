'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Notification.init({
        data: DataTypes.JSON,
        registrationToken: DataTypes.STRING,
        date: DataTypes.STRING,
        repeatedEvery: DataTypes.STRING,
        timeZoneName: DataTypes.STRING,
        timeZoneOffset: DataTypes.STRING,
        uuid: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Notification',
    });
    return Notification;
};