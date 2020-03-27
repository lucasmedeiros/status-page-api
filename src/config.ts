import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const DEFAULT_SERVER_PORT = 8000

export interface Config {
  port: number
  debugLogging: boolean
  devMode: boolean
  databaseUrl: string
  // cronJobExpression: string;
}

const isDevMode = process.env.NODE_ENV === 'development'

const config: Config = {
  port: +process.env.PORT || DEFAULT_SERVER_PORT,
  debugLogging: isDevMode,
  devMode: isDevMode,
  databaseUrl: process.env.DATABASE_URL || '...',
}

export default config
