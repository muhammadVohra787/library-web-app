import express from 'express';
import config from './server/config/config.js';
import { connectDB } from './server/db.js';
import booksRouter from './server/routes/books.routes.js'; // Adjust this path if necessary

// Create an instance of express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connectDB();

// Default route for the server
app.get('/', (req, res) => {
    res.json({ message: "Welcome to this application." });
});

// Books routes
app.use('/books', booksRouter);

// Start the server
app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info("Server started on port %s.", config.port);
    console.info("Waiting for DB connection...");
});

// Export the express app (optional, useful for testing)
export default app;
