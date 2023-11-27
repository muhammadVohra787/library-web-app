import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Alert, Button, Link, Stack, Typography } from '@mui/material'
import useLibrary from '@/api/use-library'
import useAuthentication from '@/api/use-authentication'
import { useEffect, useState } from 'react'
import NavLink from './NavLink'

/**
 * @param {*} props
 */
export default function BorrowControl( { bookId, isAvailable } ) {
    const auth = useAuthentication()
    const library = useLibrary( auth.userId )
    const [ isCheckedOut, setIsCheckedOut ] = useState( false )

    const handleBorrow = () => {
        library.borrow( bookId )
    }

    useEffect( () => {

    }, [ library.request.isComplete ] )

    console.log( 'BorrowControl =================>', auth )

    return (
        <Stack direction="row" spacing={ 5 } alignItems="center" mt={ 3 }>
            {
                library.request.isComplete && <>
                    <Alert severity='success' >You have checked out this book :)</Alert>
                </>
            }
            {
                isCheckedOut && <>
                    <Alert severity='info' >Currently checked out</Alert>
                </>
            }
            {
                ! isCheckedOut && isAvailable && <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={ handleBorrow }
                        size="large"
                        { ...{ disabled: ! auth.isSignedIn } }
                    >
                        Borrow this book
                    </Button>
                    { ! auth.isSignedIn && <>
                        <Typography fontSize="0.9em important">
                            <NavLink to="/signin">Sign in</NavLink> or <NavLink to="/signup">sign up</NavLink> to borrow this book.
                        </Typography>
                    </> }
                </>
            }
            {
                ! isCheckedOut && ! isAvailable && <>
                    <Alert severity="warning">No copies available.</Alert>
                </>
            }
        </Stack>
    )
}