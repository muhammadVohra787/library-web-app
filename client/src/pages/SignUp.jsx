import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRef, useState } from 'react'
const defaultTheme = createTheme()

export default function SignUp() {
    const letters = /^[A-Za-z\s]+$/
    const [ formData, setFormData ] = useState( {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    } )
    const [ errors, setErrors ] = useState( {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    } )

    const validateInput = ( name, value ) => {
        if ( name === 'firstname' ) {
            return {
                isValid: letters.test( value ),
                errorMessage: 'names may only contain letters',
            }
        }
        if ( name === 'lastname' ) {
            return {
                isValid: letters.test( value ),
                errorMessage: 'names may only contain letters',
            }
        }
        if ( name === 'email' ) {
            const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/
            return {
                isValid: emailPattern.test( value ),
                errorMessage: 'Invalid email address',
            }
        }

        if ( name === 'password' ) {
            return {
                isValid: value.length >= 8,
                errorMessage: 'Password must have at least 8 characters',
            }
        }

        return { isValid: true, errorMessage: '' }
    }
    const handleChange = ( e ) => {
        const { name, value } = e.target
        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) )

        const { isValid, errorMessage } = validateInput( name, value )
        setErrors( ( prevErrors ) => ( {
            ...prevErrors,
            [ name ]: isValid ? '' : errorMessage,
        } ) )
    }

    const handleSubmit = ( event ) => {
        event.preventDefault()

        const { firstname, lastname, email, password } = formData

        const firstnameValidation = validateInput( 'firstname', firstname )
        const lastnameValidation = validateInput( 'lastname', lastname )
        const emailValidation = validateInput( 'email', email )
        const passwordValidation = validateInput( 'password', password )

        setErrors( {
            firstname: firstnameValidation.isValid ? '' : firstnameValidation.errorMessage,
            lastname: lastnameValidation.isValid ? '' : lastnameValidation.errorMessage,
            email: emailValidation.isValid ? '' : emailValidation.errorMessage,
            password: passwordValidation.isValid ? '' : passwordValidation.errorMessage,
        } )

        if ( emailValidation.isValid && passwordValidation.isValid && firstnameValidation.isValid && lastnameValidation.isValid ) {
            console.log( {
                firstname,
                lastname,
                email,
                password,
            } )
        }
    }

    return (
        <ThemeProvider theme={ defaultTheme }>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
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
                    <Box component="form" noValidate onSubmit={ handleSubmit } sx={ { mt: 3 } }>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstname"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                    value={ formData.firstname }
                                    onChange={ handleChange }
                                    error={ !! errors.firstname }
                                    helperText={ errors.firstname }
                                />
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="family-name"
                                    value={ formData.lastname }
                                    onChange={ handleChange }
                                    error={ !! errors.lastname }
                                    helperText={ errors.lastname }
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
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={ formData.password }
                                    onChange={ handleChange }
                                    error={ !! errors.password }
                                    helperText={ errors.password }
                                />
                            </Grid>
                            <Grid item xs={ 12 }>

                            </Grid>
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
            </Container>
        </ThemeProvider>
    )
}
