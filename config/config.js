import { configDotenv } from 'dotenv'
configDotenv()

const databaseName = process.env.MONGO_DB_NAME || 'Library'

const config = {
    env: process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : undefined,
    stage: process.env.STAGE ? process.env.STAGE.toUpperCase() : undefined,
    port: process.env.PORT || '3000',
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
    mongoDbName: databaseName,
    mongoUri:
        process.env.MONGO_URI ||
        `mongodb://${process.env.IP || '127.0.0.1'}:${
            process.env.MONGO_PORT || '27017'
        }/${databaseName}`,
}

export default config
