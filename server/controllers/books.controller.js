import Book from '../models/book.model.js'

export const getBooks = async(req, res) => {
    try {
        const { title, author, year, tags} = req.query;

        // We need to build the filter dynamically depending on the selected query parameters
        const filter = {};
        /** Mongoose supports regular expressions in search conditions.
            $regex is used to specify a regular expression on text fields.
            new RegExp(title, 'i') is used to create a regular expression 
            that searches for the string title in a case-insensitive manner. **/

        if (title) filter.title = { $regex: new RegExp(title, 'i') }; 
        if (author) filter.author = { $regex: new RegExp(author, 'i') };
        if (year) filter.year = year;
        if (tags) filter.tags = { $in: tags.split(',') };

        console.log(tags);
        const books = await Book.find(filter);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

export const getBookByID = async(req, res) => {
    const book = await Book.findById(req.params.bookid);
    if(!book) return res.status(404).json({message: "Book not found"});
    res.json(book);
};

export const createBook = async (req, res) => {
    const { title, author, description, year, stock, thumbnail, tags} = req.body;
    try {
        const newBook = new Book({
            title,
            author,
            description,
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
    res.json(book);
};