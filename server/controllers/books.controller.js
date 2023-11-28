/* eslint-disable */
import Book from '../models/book.model.js'

export const getBooks = async(req, res) => {
    try {
        const { filter, limit, sortBy, sortOrder = '' } = req.query;
        const { id, title, author, slug, year, tags} = filter ? JSON.parse(filter) : {};

        // We need to build the filter dynamically depending on the selected query parameters
        const dbFilter = {};
        /** Mongoose supports regular expressions in search conditions.
            $regex is used to specify a regular expression on text fields.
            new RegExp(title, 'i') is used to create a regular expression
            that searches for the string title in a case-insensitive manner. **/

        if (id) dbFilter.id = { $in: id.split(',') };
        if (title) dbFilter.title = { $regex: new RegExp(title, 'i') };
        if (author) dbFilter.author = { $regex: new RegExp(author, 'i') };
        if (slug) dbFilter.slug = { $regex: new RegExp(slug, 'i') };
        if (year) dbFilter.year = year;

        //Todo: case insensitive compare
        if (tags) dbFilter.tags = { $in: tags.split(',') };

        const books = Book.find(dbFilter);

        if (limit !== undefined) {
            books.limit(limit)
        }

        if(sortBy || sortOrder) {
            let _sortOrder = '+'
            if(sortOrder === 'desc') {
                _sortOrder = '-'
            }

            const _sortBy = sortBy ? sortBy : 'title'
            books.sort(_sortOrder + _sortBy)
        }

        const results = await books

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

export async function findBookById(bookid) {
    const book = await Book.findById(bookid);
    return book;
}

export const getBookByID = async(req, res) => {
    const book = await Book.findById(req.params.bookid); //findBookById(req.params.bookid);
    if(!book) return res.status(404).json({message: "Book not found"});
    res.json(book);
};

export const createBook = async (req, res) => {
    const { title, author, description, slug, year, stock, thumbnail, tags} = req.body;

    console.log(req.body)

    try {
        const newBook = new Book({
            title,
            author,
            description,
            slug,
            year,
            stock,
            thumbnail,
            tags,
        });
        const bookCreated = await newBook.save();
        res.json(bookCreated);
    } catch (error) {
        console.log(error);
    }
};

export const updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.bookid, req.body, {
        new: true,
    });
    if(!book) return res.status(404).json({message: "Book not found"});
    res.json(book);
};

export const deleteBook = async(req, res) => {
    const book = await Book.findByIdAndDelete(req.params.bookid);
    if(!book) return res.status(404).json({message: "Book not found"});
    res.status(200).json({message: "Book deleted"});
};
// Path: server/controllers/books.controller.js