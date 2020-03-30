import { Sequelize } from 'sequelize'

import config from '../config'

const sequelize = new Sequelize({
  database: config.databaseName,
  host: config.databaseHost,
  username: config.databaseUser,
  password: config.databasePassword,
  dialect: 'postgres',
  dialectOptions: {
    charset: 'utf8',
    multipleStatements: true,
  },
  logging: false,
})

export default sequelize
