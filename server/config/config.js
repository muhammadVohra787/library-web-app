const databaseName = process.env.MONGO_DB_NAME || 'database-name-here'

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || '3000',
    jwtSecret: process.env.JWT_SECRET,
    mongoDbName: databaseName,
    mongoUri: process.env.MONGO_URI || (
        `mongodb://${ process.env.IP || 'localhost' }${ process.env.MONGO_PORT || '27017' }/${ databaseName }`
    ),
}
export default config
