// loan.controller.js
import Loan from '../models/loan.model.js'
import Book from '../models/book.model.js'

export const getLoans = async( req, res, next ) => {
    try {
        // Implementation for fetching loans
        // Todo: split into query and filters
        // isReturned is properly a filter
        const { userId, bookId, isReturned: _isReturned } = req.query
        const isReturned = _isReturned !== undefined ? JSON.parse( _isReturned ) : _isReturned
        const findParams = {}

        if ( userId ) {
            findParams.userId = userId
        }

        if ( bookId ) {
            findParams.bookId = bookId
        }

        if ( isReturned !== undefined ) {
            findParams.returnDate = isReturned ? { $exists: true } : { $exists: false }
        }

        // Return pure JSON objects
        const loans = await Loan.find( findParams ).lean()

        const loanData = []
        for ( const l of loans ) {
            // Todo: get populate() to work
            // await l.populate( 'bookId' )

            const book = await Book.findById( l.bookId.toString() )

            loanData.push( { ...l, book } )
        }
        res.loanData = loanData
        next()
        // res.json( loanData )
    }
    catch ( error ) {
        console.error( error )
        res.status( 500 ).json( { message: 'Internal Server Error' } )
    }
}

export const getLoanByID = async( req, res, next ) => {
    try {
        // Implementation for fetching a specific loan by ID
        const loanId = req.params.loanid
        const loanData = await Loan.findById( loanId )
        if ( ! loanData ) {
            res.status( 404 ).json( { message: 'Loan not found' } )
        }
        else {
            res.loanData = [ loanData ]
            // res.json( loanData )
        }
        next()
    }
    catch ( error ) {
        console.error( error )
        res.status( 500 ).json( { message: 'Internal Server Error' } )
    }
}

export const read = ( req, res ) =>{
    res.json( res.loanData )
}

export const getBookAvailability = async( req, res ) => {
    // Get checked out books (books without a return date)
    const findParams = {
        bookId: req.params.bookid,
        returnDate: { $exists: false },
    }

    // Return pure JSON objects
    const loans = await Loan.find( findParams ).lean()
    if ( ! loans ) {
        return res.status( 404 ).json( { message: 'Book not found' } )
    }

    // Subtract checked out from stock
    const available = req.book.stock - loans.length
    res.json( { available } )
}

export const createLoan = async( req, res ) => {
    try {
        // Implementation for creating a new loan
        const newLoan = new Loan( req.body )
        await newLoan.save()
        res.status( 201 ).json( newLoan )
    }
    catch ( error ) {
        console.error( error )
        res.status( 500 ).json( { message: 'Internal Server Error' } )
    }
}

export const updateLoan = async( req, res ) => {
    try {
        // Implementation for updating a loan
        const loanId = req.params.loanid
        const loanData = await Loan.findByIdAndUpdate( loanId, req.body, { new: true } )
        if ( ! loanData ) {
            res.status( 404 ).json( { message: 'Loan not found' } )
        }
        else {
            res.json( loanData )
        }
    }
    catch ( error ) {
        console.error( error )
        res.status( 500 ).json( { message: 'Internal Server Error' } )
    }
}

export const deleteLoan = async( req, res ) => {
    try {
        // Implementation for deleting a loan
        const loanId = req.params.loanid
        const loanData = await Loan.findByIdAndDelete( loanId )
        if ( ! loanData ) {
            res.status( 404 ).json( { message: 'Loan not found' } )
        }
        else {
            res.json( { message: 'Loan deleted successfully' } )
        }
    }
    catch ( error ) {
        console.error( error )
        res.status( 500 ).json( { message: 'Internal Server Error' } )
    }
}
