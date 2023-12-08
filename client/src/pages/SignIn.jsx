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
        password: '',
    } )

    const auth = useAuthentication()
    const { validate, errors } = useValidation()

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

    const handleSubmit = ( event, shortSession = false ) => {
        event.preventDefault()

        const { email, password } = formData

        const emailValidation = validate( 'email', email )
        const passwordValidation = validate( 'password', password )

        // setErrors( {
        //     email: emailValidation.isValid ? '' : emailValidation.errorMessage,
        //     // password: passwordValidation.isValid
        //     //     ? ''
        //     //     : passwordValidation.errorMessage,
        // } )

        if ( emailValidation && passwordValidation ) {
            // !! Note - no authentication at this time
            // Just a check if the email exists
            auth.signIn( email, password, shortSession )
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            {
                ! auth.isReady && <Box sx={ { display: 'flex' } }>
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
                auth.isReady && ! auth.isSignedIn &&
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
                            {
                                /* !! FOR TESTING */
                                /* Don't expose in production */
                                import.meta.env.MODE !== 'production' && <>
                                    <Button
                                        onClick={ () => {
                                            setFormData( {
                                                email: 'a@b.com',
                                                password: 'ABC123456',
                                            } )
                                        } }
                                    >Click to fill in test account (pw = ABC123456)</Button>
                                </>
                            }
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password*"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={ formData.password }
                                onChange={ handleChange }
                                error={ !! errors.password }
                                helperText={ errors.password }
                            />
                            { /* <FormControlLabel
                                control={
                                    <Checkbox value="remember" color="primary" />
                                }
                                label="Remember me"
                            /> */ }
                            {
                                auth.isSigningIn && <CircularProgress />
                            }
                            {
                                ! auth.isSigningIn && <>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={ { mt: 3, mb: 2 } }
                                        onClick={ handleSubmit }
                                    >
                                        Sign In
                                    </Button>
                                    { /* !! Short session for testing !! */ }
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={ { mt: 3, mb: 2 } }
                                        onClick={ ( e ) => handleSubmit( e, true ) }
                                    >
                                        Sign In (10 sec. session)
                                    </Button>
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
                                </>
                            }

                        </Box>
                    </Box>
            }
        </Container>
    )
}
