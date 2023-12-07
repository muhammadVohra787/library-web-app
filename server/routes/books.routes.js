import { Router } from 'express'
import { getBookByID, getBooks, createBook, updateBook, deleteBook } from '../controllers/books.controller.js'

const router = Router()

router.get( '/books/id/:bookid', getBookByID )
router.get( '/books', getBooks )

router.post( '/books', createBook )

router.put( '/books/:bookid', updateBook )

router.delete( '/books/:bookid', deleteBook )

export default router
