const config = require('../config')

module.exports = {
  database: config.databaseName,
  dialect: 'postgres',
  username: config.databaseUser,
  password: config.databasePassword,
  define: {
    timestamps: true,
    underscored: true,
  },
}
