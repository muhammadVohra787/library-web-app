import mongoose from "mongoose";
import config from "./config/config.js";

import addBooksToDatabase from './Initializers/books.initializer.js';

export const connectDB = async() => {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
        })
        await addBooksToDatabase();
        console.log("Connected to the database!");
    }catch (error) {
        console.log("unable to connect to database: ${config.mongoUri}");
    }
};

export const closeDBConnection = async() => {
    try {
        await mongoose.connection.close();
        console.log('Close DB connection successful.');
    } catch (error) {
        console.error(error);
    }};
