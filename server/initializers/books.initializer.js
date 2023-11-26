import dummyLibraryData from '../../client/src/assets/dummydata.js';
import Book from "../models/book.model.js";

const addBooksToDatabase = async (books) => {
    try {
        await Book.deleteMany({})
        await Book.insertMany(dummyLibraryData)
        console.log('Books added!')
    } catch (error) {
        console.error("Error adding books to the database:", error);
    }
};

export default addBooksToDatabase
