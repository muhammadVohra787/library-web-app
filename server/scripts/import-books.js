import fs from 'fs';
import Book from '../models/book.model.js';
import { connectDB, closeDBConnection } from '../db.js';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const jsonFilePath = join(__dirname, '../public/books.js');
console.log(jsonFilePath);
const jsonContent = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

const importBooks = async () => {
    try {
        for (const book of jsonContent) {
          const existingBook = await Book.findOne({ title: book.title });
          if (!existingBook) {
            await Book.create(book);
            console.log(`Book imported: ${book.title}`);
          } else {
            console.log(`Book already exist: ${book.title}. Not imported.`);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        closeDBConnection();
    }
  };

  importBooks();