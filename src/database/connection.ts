import { Sequelize } from 'sequelize'

import config from '../config'

const sequelize = new Sequelize({
  database: config.database.name,
  dialect: 'postgres',
  ssl: !config.devMode,
  host: config.database.host,
  username: config.database.user,
  password: config.database.password,
  port: config.database.port,
  dialectOptions: {
    charset: 'utf8',
    multipleStatements: true,
  },
  logging: false,
})

export default sequelize
