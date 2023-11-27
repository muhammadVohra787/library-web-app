import { useEffect, useState } from 'react'
import useFetch from './use-fetch'

export default function useLibrary( userId ) {
    const [ isCheckedOutByUser, setIsCheckedOutByUser ] = useState( false )
    const loanHistory = useFetch()
    const loanStatus = useFetch()
    const loanControl = useFetch()

    useEffect( () => {
        if ( loanControl.isComplete ) {
            loanHistory.refetch()
        }
    }, [ loanControl.isComplete ] )

    useEffect( () => {
        if ( loanControl.isComplete ) {
            loanHistory.refetch()
        }
    }, [ loanControl.isComplete ] )

    useEffect( () => {
        if ( loanStatus.isComplete ) {
            // console.log( 'loanDetails.data.returnDate ', ! loanStatus.data.returnDate, !! loanStatus.data.returnDate )
            setIsCheckedOutByUser( !! loanStatus.data.length )
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

        getLoans() {
            loanHistory.fetch( '/loans', { query: { userId } } )
        },
        getBorrowStatus( bookId ) {
            loanStatus.fetch( `/loans`, { query: { userId, bookId } } )
        },
        borrow( bookId ) {
            const dueDate = new Date()
            const loanData = {
                bookId,
                userId,
                loanDate: Date.now(),
                dueDate: new Date().setDate( dueDate.getDate() + 14 ),
                //
            }

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
