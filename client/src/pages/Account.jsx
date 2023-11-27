import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Chip,
    Card,
    CardContent,
    Stack,
    TextField,
    InputLabel,
    FormHelperText,
    Alert,
    CircularProgress,
    List,
    ListItemText,
} from '@mui/material'

import InputIcon from '@mui/icons-material/Input'

import useAuthentication from '@/api/use-authentication'
import Authorized from '@/components/Authorized'
import useAccount from '@/api/use-account'
import useValidation from '@/api/use-validation'
import useLibrary from '@/api/use-library'
import NavLink from '@/components/NavLink'

export default function Account() {
    const user = useAuthentication()
    const account = useAccount()
    const library = useLibrary( user.userId )
    const { validate, errors } = useValidation()

    // Keep track of books that are returned
    // Status can't live in subcomponent because it's rerendered
    const [ checkoutStatus, setCheckoutStatus ] = useState( {} )

    const [ name, setName ] = useState( '' )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )

    const resetHandler = () => {
        setName( user.userData.name )
        setEmail( user.userData.email )
        // setPassword( user.userData.password )
    }

    const saveHandler = ( e ) =>{
        e.preventDefault()
        const nameValidation = validate( 'name', email )
        const emailValidation = validate( 'email', email )
        console.log( user )

        if ( emailValidation && nameValidation ) {
            account.updateUser( user.userId, { name, email } )
        }
    }

    const onNameChange = ( event ) => {
        setName( event.target.value )
        validate( 'name', event.target.value )
    }

    const onEmailChange = ( event ) => {
        setEmail( event.target.value )
        validate( 'email', event.target.value )
    }

    const onPasswordChange = ( event ) =>{
        // setPassword( event.target.value )
    }

    useEffect( () => {
        // Get user's loans on first load
        if ( user.userId ) {
            library.getLoans()
        }
    }, [ user.userId ] )

    useEffect( () => {
        console.log( 'ACCOUNT ==> ', user )

        if ( user.userData ) {
            resetHandler()
        }
    }, [ user.isGettingStatus ] )

    useEffect( () => {
        console.log( 'account.status.isComplete ==> ', user )

        if ( account.status.isComplete ) {
            user.refresh()
        }
    }, [ account.status.isComplete ] )

    return (
        <Container style={ { marginTop: '20px' } }>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={ 6 }>
                <Typography variant="h4" component="h2">
                    User Account
                </Typography>
            </Stack>

            <Authorized>
                <Grid container spacing={ 6 }>
                    <Grid item xs={ 12 } md={ 6 }>
                        <Paper>
                            <Box p={ 5 }>
                                <Typography variant="h5" component="h3" mb={ 4 }>
                                    Account Details
                                </Typography>

                                <Grid container spacing={ 3 } direction="row">
                                    <Grid item xs={ 12 } md={ 4 }>
                                        <InputLabel>
                                            Name
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={ 12 } md={ 8 }>
                                        <TextField
                                            id="name"
                                            fullWidth
                                            required
                                            value={ name }
                                            onChange={ onNameChange }
                                            error={ !! errors.name }
                                            helperText={ errors.name }
                                        />
                                        <FormHelperText>(Enter Full Name)</FormHelperText>
                                    </Grid>

                                    <Grid item xs={ 12 } md={ 4 }>
                                        <InputLabel>
                                            Email
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={ 12 } md={ 8 }>
                                        <TextField
                                            id="email"
                                            fullWidth
                                            required
                                            value={ email }
                                            onChange={ onEmailChange }
                                            error={ !! errors.email }
                                            helperText={ errors.email }
                                        />
                                        <FormHelperText>(Enter email address)</FormHelperText>
                                    </Grid>

                                    <Grid item xs={ 12 } md={ 4 }>
                                        <InputLabel>
                                            Password
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={ 12 } md={ 8 }>
                                        <TextField id="password" fullWidth required value={ password } onChange={ onPasswordChange } disabled />
                                        <FormHelperText>(Enter new password -- not implemented)</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Stack mt={ 6 } spacing={ 3 }>
                                    {
                                        account.status.isFetching && <Box sx={ { display: 'flex' } }>
                                            <CircularProgress />
                                        </Box>
                                    }
                                    {
                                        account.status.isComplete &&
                                            <Alert severity="success">
                                                <Typography component="h2">Changes have been saved.</Typography>
                                            </Alert>
                                    }
                                    {
                                        ! account.status.isFetching &&
                                            <Stack direction="row" spacing={ 3 }>
                                                <Button variant='contained' onClick={ saveHandler }>Save </Button>
                                                <Button onClick={ resetHandler }> Reset </Button>
                                            </Stack>
                                    }
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={ 12 } md={ 6 }>
                        <Paper>
                            <Box p={ 5 }>
                                <Typography variant="h5" component="h3" mb={ 4 }>
                                    Borrow History
                                </Typography>
                                <Box>
                                    {
                                        ( ! library.loans || ! library.loans.length ) && <Alert severity="info">Nothing here... Go find something to read!</Alert>
                                    }
                                    <List>
                                        { library.loans.map( ( item ) =>
                                            <BookHistoryItem
                                                key={ item._id }
                                                item={ item }
                                                userId={ user.userId }
                                                checkoutStatus={ { status: checkoutStatus, set: ( loanId, status ) => {
                                                    setCheckoutStatus( ( prev ) => {
                                                        return {
                                                            ...prev,
                                                            [ loanId ]: status,
                                                        }
                                                    } )
                                                } } }
                                            />,
                                        ) }

                                    </List>
                                </Box>
                            </Box>

                        </Paper>
                    </Grid>
                </Grid>
            </Authorized>
        </Container>
    )
}

function BookHistoryItem( { item, userId, checkoutStatus } ) {
    // Todo: automatic status refetch after book status update doesn't work because the component is reloaded
    const library = useLibrary( userId )

    const loanDateInt = Date.parse( item.loanDate )
    const loanDate = new Date( loanDateInt ).toDateString()
    const dueDateInt = Date.parse( item.dueDate )
    const dueDate = new Date( dueDateInt ).toDateString()
    const returnDateInt = Date.parse( item.returnDate )
    const returnDate = new Date( returnDateInt ).toDateString()
    const isOverdue = dueDateInt < Date.now()

    /** @type [any,any] */
    const [ status, setStatus ] = useState( { text: '', colour: 'info' } )

    const returnHandler = () => {
        library.return( item._id )
    }

    const updateStatus = ( checkedOut, overdue ) => {
        const text = ! checkedOut ? 'Returned' : ( overdue ? 'Overdue!' : `Checked Out` )
        setStatus( { text, colour: checkedOut ? 'info' : ( overdue ? 'error' : `success` ) } )
    }

    // Set internal book status on load, after loan id and user id have been set
    useEffect( () => {
        if ( ! item._id && ! userId ) {
            return
        }

        if ( ! returnDateInt ) {
            checkoutStatus.set( item._id, true )
        }

        if ( ! status.text ) {
            updateStatus( checkoutStatus.status[ item._id ], isOverdue )
        }
    }, [ returnDateInt, isOverdue, item._id, userId, status.text ] )

    // Update internal book status after book has been returned
    useEffect( () => {
        if ( ! item._id && ! userId ) {
            return
        }

        if ( library.checkoutStatusChanged !== null && library.checkoutStatusChanged !== checkoutStatus.status[ item._id ] ) {
            checkoutStatus.set( item._id, library.checkoutStatusChanged )
            updateStatus( library.checkoutStatusChanged, isOverdue )
        }
    }, [ item._id, userId, library.checkoutStatusChanged ] )

    return (
        <Card
            key={ item._id }
            variant="outlined"
            sx={ {
                background: '#eee',
                marginBottom: '10px',
            } }
        >
            <CardContent>
                <Stack direction="row" spacing={ 2 } mb={ 2 }>
                    <Box flex="1">
                        <Typography component="h4" variant="h6">
                            <NavLink underline="hover" to={ `/book/${ item.book?.slug}` } >{ item.book?.title }</NavLink>
                        </Typography>
                    </Box>
                    <Box>
                        <Chip label={ status.text } color={ status.colour } size="small" />
                    </Box>
                </Stack>
                <Stack direction="row">
                    <Stack flexGrow="1">
                        {
                            checkoutStatus.status[ item._id ] &&
                                <ListItemText
                                    secondary={ `Due: ${ dueDate }` }
                                />
                        }
                        {
                            ! checkoutStatus.status[ item._id ] &&
                                <ListItemText
                                    secondary={ `Returned: ${ returnDateInt ? returnDate : 'pending' }` }
                                />
                        }
                        <ListItemText
                            secondary={ `Borrowed: ${ loanDate }` }
                        />
                    </Stack>
                    <Box>
                        {
                            checkoutStatus.status[ item._id ] && <>
                                {
                                    library.isCheckoutStatusChangePending && <CircularProgress />
                                }
                                {
                                    ! library.isCheckoutStatusChangePending && <Button variant="outlined" endIcon={ <InputIcon /> } onClick={ returnHandler }>
                                        Return now
                                    </Button>
                                }
                            </>
                        }

                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}
