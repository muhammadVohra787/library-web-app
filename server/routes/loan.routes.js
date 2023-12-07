import express from 'express'
import { getLoans, getLoanByID, createLoan, updateLoan, deleteLoan } from '../controllers/loan.controller.js'

const router = express.Router()

router.get( '/loans', getLoans )
router.get( '/loans/:loanid', getLoanByID )
router.post( '/loans', createLoan )
router.put( '/loans/:loanid', updateLoan )
router.delete( '/loans/:loanid', deleteLoan )

export default router
