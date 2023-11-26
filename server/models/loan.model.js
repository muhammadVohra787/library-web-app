import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    loanDate: {
        type: Date,
    },
    dueDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
});

export default mongoose.model("loan", loanSchema);

