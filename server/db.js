import mongoose from 'mongoose'
import config from '../config/config.js'
import importBooks from './scripts/import-books.js'

export const connectDB = async() => {
    try {
        console.info( 'Waiting for DB connection...' )
        await mongoose.connect( config.mongoUri, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
        } )
        console.log( 'Connected to the database!' )
        await importBooks()
    }
    catch ( error ) {
        console.log( `\nUnable to connect to database: ${config.mongoUri}\n` )
        console.log( error )
    }
}

export const closeDBConnection = async() => {
    try {
        await mongoose.connection.close()
        console.log( 'Close DB connection successful.' )
    }
    catch ( error ) {
        console.error( error )
    }
}
