import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const DEFAULT_SERVER_PORT = 8000
const isDevMode = process.env.NODE_ENV === 'development'

const config = {
  port: process.env.PORT ? +process.env.PORT : DEFAULT_SERVER_PORT,
  debugLogging: isDevMode,
  devMode: isDevMode,
  databaseUser: isDevMode ? 'postgres' : process.env.DATABASE_USER,
  databasePassword: isDevMode ? '123456' : process.env.DATABASE_PASSWORD,
  databaseName: 'statuspage',
  databaseHost: isDevMode ? 'localhost' : process.env.DATABASE_HOST,
}

export default config
