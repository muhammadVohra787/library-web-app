const databaseName = process.env.MONGO_DB_NAME || "Library";

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || "3000",
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoDbName: databaseName,
    mongoUri:
        process.env.MONGO_URI ||
        `mongodb+srv://group10:Tn7CHYBIpjNvgJLq@library-mern-group10.iwh6dvk.mongodb.net/
        }/${databaseName}`,
};

export default config;
