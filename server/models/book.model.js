import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    description: {
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