import { Alert, Box, Button, CircularProgress, Link, Stack, Typography } from '@mui/material'
import useLibrary from '@/api/use-library'
import { useEffect, useState } from 'react'
import NavLink from './NavLink'

/**
 * @param {*} props
 */
export default function BorrowControl( { book, userId, isSignedIn } ) {
    const { _id: bookId, stock } = book ?? {}

    const library = useLibrary( userId )
    const [ availableCopies, setAvailableCopies ] = useState( -1 )

    const handleBorrow = () => {
        library.borrow( bookId )
    }

    useEffect( () => {
        if ( bookId ) {
            library.getBookCheckouts( bookId )
        }
        if ( userId && bookId ) {
            library.getBorrowStatus( bookId )
        }
    }, [ userId, bookId ] )

    useEffect( () => {
        if ( library.bookCheckoutCount !== -1 ) {
            setAvailableCopies( stock - library.bookCheckoutCount )
        }
    }, [ stock, library.bookCheckoutCount ] )

    if ( availableCopies === -1 || library.isCheckoutStatusChangePending || library.isCheckoutStatusCheckPending ) {
        return <CircularProgress />
    }

    return (
        <Stack>
            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Available: { availableCopies === -1 ? 'n/a' : availableCopies }
                </Typography>
            </Box>
            <Stack direction="row" spacing={ 5 } alignItems="center" mt={ 3 }>
                {
                    library.isCheckedOutByUser && <>
                        <Alert severity='success' >Currently checked out</Alert>
                    </>
                }
                {
                    ! library.isCheckedOutByUser && ! availableCopies && <>
                        <Alert severity="warning">No copies available.</Alert>
                    </>
                }
                {
                    ! library.isCheckedOutByUser && availableCopies > 0 && <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ handleBorrow }
                            size="large"
                            { ...{ disabled: ! isSignedIn } }
                        >
                            Borrow this book
                        </Button>
                        { ! isSignedIn && <>
                            <Typography fontSize="0.9em important">
                                <NavLink to="/signin">Sign in</NavLink> or <NavLink to="/signup">sign up</NavLink> to borrow this book.
                            </Typography>
                        </> }
                    </>
                }
            </Stack>
        </Stack>

    )
}
