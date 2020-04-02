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
  slack: {
    botUserToken: process.env.BOT_USER_TOKEN,
    signinSecret: process.env.SLACK_APP_SIGNIN_SECRET,
    clientId: process.env.SLACK_APP_CLIENT_ID,
    verificationToken: process.env.SLACK_APP_VERIFICATION_TOKEN,
  },
}

export default config
