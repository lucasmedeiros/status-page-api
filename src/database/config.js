require('dotenv').config()

module.exports = {
  database: 'statuspage',
  dialect: 'postgres',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || '123456',
  define: {
    timestamps: true,
    underscored: true,
  },
}
