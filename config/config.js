import { configDotenv } from 'dotenv'
configDotenv()

const databaseName = process.env.MONGO_DB_NAME || 'Library'
const apiEndpointUrl = process.env.API_ENDPOINT_URL || '/api'

const config = {
    apiEndpointUrl,
    env: process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : undefined,
    stage: process.env.STAGE ? process.env.STAGE.toUpperCase() : undefined,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
    port: process.env.PORT || '3000',
    mongoDbName: databaseName,
    mongoUri: `${process.env.MONGO_URI}`,
}

export default config
