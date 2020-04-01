'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Occurrences', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      componentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Components', key: 'id' },
      },
      incidentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Incidents', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Occurrences')
  },
}
