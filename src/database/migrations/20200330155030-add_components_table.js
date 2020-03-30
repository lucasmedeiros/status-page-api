'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Components', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATEONLY,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATEONLY,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Components')
  },
}
