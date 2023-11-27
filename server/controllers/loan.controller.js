// loan.controller.js
import loan from '../models/loan.model.js'

export const getLoans = async( req, res ) => {
    try {
        // Implementation for fetching loans
        const { userId } = req.query
        const findParams = {}

        if ( userId ) {
            findParams.userId = userId
        }

        const loans = await loan.find( findParams )
        res.json( loans )
    }
    catch ( error ) {
        console.error( error )
        res.status( 500 ).json( { message: 'Internal Server Error' } )
    }
}

export const getLoanByID = async( req, res ) => {
    try {
        // Implementation for fetching a specific loan by ID
        const loanId = req.params.loanid
        const loanData = await loan.findById( loanId )
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

export const createLoan = async( req, res ) => {
    try {
        // Implementation for creating a new loan
        const newLoan = new loan( req.body )
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
        const loanData = await loan.findByIdAndUpdate( loanId, req.body, { new: true } )
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
        const loanData = await loan.findByIdAndDelete( loanId )
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
