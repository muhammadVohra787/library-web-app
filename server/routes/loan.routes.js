import express from 'express'
import { getBookAvailability, getLoans, getLoanByID, createLoan, updateLoan, deleteLoan, read } from '../controllers/loan.controller.js'
import { getBookByID } from '../controllers/books.controller.js'
import { requireSignin } from '../controllers/auth.controller.js'

const router = express.Router()

// Called by all routes that utilize the :loanid param
router.param( 'loanid', getLoanByID )
router.param( 'bookid', getBookByID )

router
    .route( '/loans' )
    .get( requireSignin, getLoans, read )
    .post( requireSignin, createLoan )

router
    .route( '/loans/:loanid' )
    .get( requireSignin, read )
    .put( requireSignin, updateLoan )
    .delete( requireSignin, deleteLoan )

router
    .route( '/availability/:bookid' )
    .get( getBookAvailability )

export default router
