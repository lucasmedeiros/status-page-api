require('dotenv').config()

const isDevMode = process.env.NODE_ENV === 'development'

const options = {
  ssl: false,
  database: isDevMode ? 'statuspage' : process.env.DATABASE_NAME,
  dialect: 'postgres',
  host: isDevMode ? 'localhost' : process.env.DATABASE_HOST || 'localhost',
  username: isDevMode ? 'postgres' : process.env.DATABASE_USER || 'postgres',
  password: isDevMode ? '123456' : process.env.DATABASE_PASSWORD || '123456',
  port: isDevMode
    ? 5432
    : process.env.DATABASE_PORT
    ? +process.env.DATABASE_PORT
    : 5432,
  define: {
    timestamps: true,
    underscored: false,
  },
}

module.exports = options
