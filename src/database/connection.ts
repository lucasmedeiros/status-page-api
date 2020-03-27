import { Sequelize } from 'sequelize-typescript'
import config from '@src/config'
import Component from '@models/component'

const models = [Component]

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
  models,
})

export default sequelize
