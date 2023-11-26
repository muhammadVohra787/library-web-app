import { useContext, useEffect, useRef, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Alert, Stack } from '@mui/material'

import useAccount from '../api/use-account'
import useValidation from '@/api/use-validation'

export default function SignUp() {
    const [ formData, setFormData ] = useState( {
        name: '',
        email: '',
        // password: '',
    } )

    // const [ accountCreateError, setAccountCreateError ] = useState()
    const [ account, setAccount ] = useState()
    const accounts = useAccount()
    const { validate, errors } = useValidation()

    useEffect( () => {
        if ( accounts.data ) {
            setAccount( accounts.data )
        }
    }, [ accounts.status.isComplete ] )

    const handleChange = ( e ) => {
        const { name, value } = e.target
        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) )
        validate( name, value )
    }

    const handleSubmit = ( event ) => {
        event.preventDefault()

        const { name, email } = formData

        const nameValidation = validate( 'name', name )
        const emailValidation = validate( 'email', email )
        // const passwordValidation = validate( 'password', password )

        if (
            emailValidation &&
            // passwordValidation.isValid &&
            nameValidation
        ) {
            accounts.createAccount( { name: formData.name, email: formData.email } )
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            { /* {
                accountCreateError && <Alert severity="error">Something went wrong.</Alert>
            } */ }
            {
                account && <Stack
                    alignItems='center'
                    spacing={ 4 }
                    mt={ 10 }
                    mb={ 10 }
                >
                    <Alert severity="success">
                        <Typography fontSize="1.5rem">Account created!</Typography>
                    </Alert>
                    <Button variant="contained" href="/signin">Sign in</Button>
                </Stack>
            }
            {
                ! account && <Box
                    sx={ {
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    } }
                >
                    <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={ handleSubmit }
                        sx={ { mt: 3 } }
                    >
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 }>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={ formData.name }
                                    onChange={ handleChange }
                                    error={ !! errors.name }
                                    helperText={ errors.name }
                                />
                            </Grid>
                            <Grid item xs={ 12 }>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={ formData.email }
                                    onChange={ handleChange }
                                    error={ !! errors.email }
                                    helperText={ errors.email }
                                />
                            </Grid>
                            <Grid item xs={ 12 }>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password (not implemented)"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={ 12 }></Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={ { mt: 3, mb: 2 } }
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            }
        </Container>
    )
}
