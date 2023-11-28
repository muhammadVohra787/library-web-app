import mongoose from "mongoose"

// book.model.js server\models\book.model.js


const bookSchema = new mongoose.Schema({
    id : {
        type: Number,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
    },
    year: {
        type: String,
    },
    stock: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tags: {
        type: [String],
    },
}); 

export default mongoose.model('Book', bookSchema);