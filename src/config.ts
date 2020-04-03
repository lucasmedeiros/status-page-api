import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const DEFAULT_SERVER_PORT = 8000
const isDevMode = process.env.NODE_ENV === 'development'

const config = {
  port: process.env.PORT ? +process.env.PORT : DEFAULT_SERVER_PORT,
  debugLogging: isDevMode,
  devMode: isDevMode,
  database: {
    user: isDevMode ? 'postgres' : process.env.DATABASE_USER,
    password: isDevMode ? '123456' : process.env.DATABASE_PASSWORD,
    name: isDevMode ? 'statuspage' : process.env.DATABASE_NAME,
    host: isDevMode ? 'localhost' : process.env.DATABASE_HOST,
    port: isDevMode
      ? 5432
      : process.env.DATABASE_PORT
      ? +process.env.DATABASE_PORT
      : 5432,
  },
  slack: {
    botUserToken: process.env.BOT_USER_TOKEN,
    signinSecret: process.env.SLACK_APP_SIGNIN_SECRET,
    clientId: process.env.SLACK_APP_CLIENT_ID,
    verificationToken: process.env.SLACK_APP_VERIFICATION_TOKEN,
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
  },
}

export default config
