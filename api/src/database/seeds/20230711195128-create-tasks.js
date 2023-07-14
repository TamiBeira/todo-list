'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title_task:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      },
      update_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('tasks');

  }

};


