import useFetch from './use-fetch'

export default function useLibrary( userId ) {
    const loanControl = useFetch()

    return {
        request: {},
        get loans() {
            return ( loanControl.data && [ ...loanControl.data ].reverse() ) || []
        },
        getLoans() {
            loanControl.fetch( '/loans', { query: { userId } } )
        },
        getLoanDetails( bookId ) {

        },
        getBorrowStatus( bookId ) {

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
        return( bookId ) {
            // returnDate: Date.now(),
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
