import { Router } from 'express'
import { getBookByID, getBooks, createBook, updateBook, deleteBook, read } from '../controllers/books.controller.js'
import { requireSignin, hasAuthorization } from '../controllers/auth.controller.js'

const router = Router()

// router.get( '/books/id/:bookid', getBookByID )

// Called by all routes that utilize the :loanid param
router.param( 'bookid', getBookByID )

router
    .route( '/books' )
    .get( getBooks )
    .post( createBook )

router
    .route( '/books/:bookid' )
    .get( read )
    .put( updateBook )
    .delete( deleteBook )

export default router
