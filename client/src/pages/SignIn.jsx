import { useContext, useEffect, useState } from 'react'
// import { Redirect } from 'react-router-dom'

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
import useAuthentication from '../api/use-authentication'
import { Alert, CircularProgress, Stack } from '@mui/material'
import useValidation from '@/api/use-validation'
import NavLink from '@/components/NavLink'

export default function SignIn() {
    const [ formData, setFormData ] = useState( {
        email: '',
        // password: '',
    } )

    const auth = useAuthentication()
    const { validate, errors } = useValidation()

    console.log( auth )

    const handleChange = ( e ) => {
        const { name, value } = e.target
        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) )

        // const { isValid, errorMessage } =
        validate( name, value )
        // setErrors( ( prevErrors ) => ( {
        //     ...prevErrors,
        //     [ name ]: isValid ? '' : errorMessage,
        // } ) )
    }

    const handleSubmit = ( event ) => {
        event.preventDefault()

        const { email } = formData

        const emailValidation = validate( 'email', email )
        // const passwordValidation = auth.validate( 'password', password )

        // setErrors( {
        //     email: emailValidation.isValid ? '' : emailValidation.errorMessage,
        //     // password: passwordValidation.isValid
        //     //     ? ''
        //     //     : passwordValidation.errorMessage,
        // } )

        if ( emailValidation ) {
            // !! Note - no authentication at this time
            // Just a check if the email exists
            auth.signIn( email )
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            {
                auth.isGettingStatus && ! auth.isSignedIn && <Box sx={ { display: 'flex' } }>
                    <CircularProgress />
                </Box>
            }
            {
                auth.isSignedIn && <Stack spacing={ 3 } mt={ 10 } mb={ 10 } alignItems="stretch">
                    <Alert severity="success">
                        <Typography component="h2">Signed in</Typography>
                    </Alert>
                    <Stack direction="row" justifyContent="center" spacing={ 3 }>
                        <NavLink asButton variant="contained" to="/">Front Page</NavLink>
                        <NavLink asButton variant="contained" to="/account">My Account</NavLink>
                    </Stack>
                </Stack>
            }
            {
                ! auth.isGettingStatus && ! auth.isSignedIn &&
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
                            Sign in
                        </Typography>
                        {
                            auth.isSignInFailed && <Stack spacing={ 3 } mt={ 4 } mb={ 4 } alignItems="stretch">
                                <Alert severity="error">
                                    <Typography component="h2">Wrong email or password.</Typography>
                                </Alert>
                            </Stack>
                        }
                        <Box
                            component="form"
                            onSubmit={ handleSubmit }
                            noValidate
                            sx={ { mt: 1 } }
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={ formData.email }
                                onChange={ handleChange }
                                error={ !! errors.email }
                                helperText={ errors.email }
                            />
                            <TextField
                                disabled
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password (not implemented)"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            { /* <FormControlLabel
                                control={
                                    <Checkbox value="remember" color="primary" />
                                }
                                label="Remember me"
                            /> */ }
                            {
                                auth._status.isFetching && <CircularProgress />
                            }
                            {
                                ! auth._status.isFetching &&

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={ { mt: 3, mb: 2 } }
                                    >
                                        Sign In
                                    </Button>
                            }
                            <Grid container>
                                { /* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */ }
                                <Grid item>
                                    <NavLink to="/signup" variant="body2">
                                        Don't have an account? Sign Up
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
            }
        </Container>
    )
}
