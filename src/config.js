const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: process.env.PORT,
  apiUserName: process.env.API_NAME,
  apiSecretkey: process.env.API_KEY,
  dbHost: process.env.DB_HOST,
}
