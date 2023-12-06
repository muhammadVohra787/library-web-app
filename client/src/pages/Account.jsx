import { useEffect, useState } from 'react'
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
    const auth = useAuthentication()
    const userData = useAccount()
    const dispatcher = useAccount()
    const library = useLibrary( auth.userId )
    const { validate, errors } = useValidation()

    const [ formData, setFormData ] = useState( {
        name: '',
        email: '',
        password: '',
    } )

    // useCallback??
    const resetHandler = () => {
        setFormData( {
            name: userData.data.name,
            email: userData.data.email,
            password: userData.data.password,
        } )
    }

    const saveHandler = ( e ) => {
        e.preventDefault()
        const nameValidation = validate( 'name', formData.name )
        const emailValidation = validate( 'email', formData.email )

        if ( emailValidation && nameValidation ) {
            dispatcher.updateUser( auth.userId, formData )
        }
    }

    const changeHandler = ( e ) => {
        const { name, value } = e.target

        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) )

        // Todo: validation not working
        // validate( name, value )
    }

    useEffect( () => {
        if ( auth.userId ) {
            userData.getUserById( auth.userId )
            library.getLoans()
        }
    }, [ auth.userId ] )

    useEffect( () => {
        if ( userData.status.isComplete ) {
            console.log( 'RESET form' )
            setFormData( {
                name: userData.data.name,
                email: userData.data.email,
                password: '',
            } )
        }
    }, [ userData.status.isComplete ] )

    return (
        <Container style={ { marginTop: '20px' } }>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={ 6 }>
                <Typography variant="h4" component="h2">
                    My Account
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
                                {
                                    userData.status.isFetching && <Box sx={ { display: 'flex' } }>
                                        <CircularProgress />
                                    </Box>
                                }
                                {
                                    ! userData.status.isFetching && <>
                                        <Grid container spacing={ 3 } direction="row">
                                            <Grid item xs={ 12 } md={ 4 }>
                                                <InputLabel>
                                                    Name
                                                </InputLabel>
                                            </Grid>
                                            <Grid item xs={ 12 } md={ 8 }>
                                                <TextField
                                                    id="name"
                                                    name="name"
                                                    fullWidth
                                                    required
                                                    value={ formData.name }
                                                    onChange={ changeHandler }
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
                                                    name="email"
                                                    fullWidth
                                                    required
                                                    value={ formData.email }
                                                    onChange={ changeHandler }
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
                                                <TextField
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    fullWidth
                                                    value=""
                                                    onChange={ changeHandler }
                                                    disabled
                                                />
                                                <FormHelperText>(Enter new password - Not implemented)</FormHelperText>
                                                <TextField
                                                    id="confirm-password"
                                                    name="confirm-password"
                                                    type="password"
                                                    fullWidth
                                                    disabled
                                                    value=""
                                                />
                                                <FormHelperText>(Confirm new password - Not implemented)</FormHelperText>
                                            </Grid>
                                        </Grid>
                                        <Stack mt={ 6 } spacing={ 3 }>
                                            {
                                                dispatcher.status.isFetching && <Box sx={ { display: 'flex' } }>
                                                    <CircularProgress />
                                                </Box>
                                            }
                                            {
                                                dispatcher.status.isComplete &&
                                                    <Alert severity="success">
                                                        <Typography component="h2">Changes have been saved.</Typography>
                                                    </Alert>
                                            }
                                            {
                                                ! dispatcher.status.isFetching &&
                                                    <Stack direction="row" spacing={ 3 }>
                                                        <Button variant='contained' onClick={ saveHandler }>Save </Button>
                                                        <Button onClick={ resetHandler }> Reset </Button>
                                                    </Stack>
                                            }
                                        </Stack>
                                    </>
                                }
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
                                        library.isFetchingLoanHistory && <CircularProgress />
                                    }
                                    {
                                        ! library.isFetchingLoanHistory && ( ! library.loans || ! library.loans.length ) && <Alert severity="info">Nothing here... Go find something to read!</Alert>
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
