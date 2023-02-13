'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notifications', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            data: {
                type: Sequelize.JSON,
                defaultValue: {}
            },
            registrationToken: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.STRING
            },
            repeatedEvery: {
                type: Sequelize.STRING
            },
            timeZoneName: {
                type: Sequelize.STRING
            },
            timeZoneOffset: {
                type: Sequelize.STRING
            },
            uuid: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notifications');
    }
};