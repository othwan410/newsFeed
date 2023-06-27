'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING
      },
      name: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      message: {
        allowNull: true, // NULL
        type: Sequelize.STRING,
      },
      nickname: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};