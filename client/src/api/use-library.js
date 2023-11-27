import { useEffect, useState } from 'react'
import useFetch from './use-fetch'

export default function useLibrary( userId ) {
    const [ isCheckedOutByUser, setIsCheckedOutByUser ] = useState( false )
    const loanHistory = useFetch()
    const loanStatus = useFetch()
    const loanControl = useFetch()
    const bookCheckouts = useFetch()

    useEffect( () => {
        if ( loanControl.isComplete ) {
            loanHistory.refetch()
        }
    }, [ loanControl.isComplete ] )

    useEffect( () => {
        if ( loanControl.isComplete ) {
            // Refetch loan data (fetch is only executed if it has already been used)
            loanStatus.refetch()
            loanHistory.refetch()
            bookCheckouts.refetch()
        }
    }, [ loanControl.isComplete ] )

    useEffect( () => {
        if ( loanStatus.isComplete ) {
            const loanItem = loanStatus.data.length ? loanStatus.data[ 0 ] : null
            setIsCheckedOutByUser( !! loanItem )
        }
    }, [ loanStatus.isComplete ] )

    return {
        request: {},
        get loans() {
            return ( loanHistory.isInitialized && loanHistory.data && [ ...loanHistory.data ].reverse() ) || []
        },

        get isCheckedOutByUser() {
            return isCheckedOutByUser
        },
        get bookCheckouts() {
            return bookCheckouts.isComplete ? bookCheckouts.data : []
        },
        get bookCheckoutCount() {
            return bookCheckouts.isComplete ? bookCheckouts.data.length : -1
        },
        get checkoutStatusChanged() {
            console.log( 'loanControl.data', loanControl.data )
            return loanControl.isComplete && loanControl.data && loanControl.data._id ? ! loanControl.data.returnDate : null
        },
        get isCheckoutStatusChangePending() {
            return loanControl.isFetching
        },
        get isCheckoutStatusCheckPending() {
            return loanStatus.isFetching
        },
        getBookCheckouts( bookId ) {
            bookCheckouts.fetch( '/loans', { query: { bookId, isReturned: false } } )
        },
        getLoans() {
            loanHistory.fetch( '/loans', { query: { userId } } )
        },
        getBorrowStatus( bookId ) {
            console.log( 'getBorrowStatus\n\n', { userId, bookId, isReturned: false } )
            loanStatus.fetch( `/loans`, { query: { userId, bookId, isReturned: false } } )
        },
        borrow( bookId ) {
            console.log( 'BORROW: ', userId )
            const dueDate = new Date()
            const loanData = {
                bookId,
                userId,
                loanDate: Date.now(),
                dueDate: new Date().setDate( dueDate.getDate() + 14 ),
            }

            console.log( 'Borrowing book: ', loanData )

            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( loanData ),
            }

            loanControl.fetch( '/loans', { options } )
        },
        return( loanId ) {
            const options = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { returnDate: Date.now() } ),
            }

            loanControl.fetch( `/loans/${ loanId}`, { options } )
        },
    }
}

// bookId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Book",
// },
// userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
// },
// loanDate: {
//     type: Date,
// },
// dueDate: {
//     type: Date,
// },
// returnDate: {
//     type: Date,
// },
