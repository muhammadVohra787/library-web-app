// import fs from 'fs'
import Book from '../models/book.model.js'
import { connectDB, closeDBConnection } from '../db.js'
// import { fileURLToPath } from 'url'
// import { join, dirname } from 'path'
import sampleData from './sample-data.js'

// const __filename = fileURLToPath( import.meta.url )
// const __dirname = dirname( __filename )

connectDB()

/**
 * Script originally by @Julian0718
 *
 * @link https://github.com/galloppinggryphon/library-web-app/commit/a13e27bd3bcb8b44b26288170460b8b7f1678a01#diff-d9d62cfbcdf55353610e4e317816576f12beb7ebcf27ddf9c95c155b9125c54f
 */
const importBooks = async() => {
    try {
        for ( const book of sampleData ) {
            const existingBook = await Book.findOne( { title: book.title } )
            if ( ! existingBook ) {
                await Book.create( book )
                console.log( `Book imported: ${book.title}` )
            }
            else {
                console.log( `Book already exist: ${book.title}. Not imported.` )
            }
        }
    }
    catch ( error ) {
        console.error( error )
    }
    finally {
        closeDBConnection()
    }
}

importBooks()
