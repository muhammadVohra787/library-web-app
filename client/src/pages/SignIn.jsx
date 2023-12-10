import { useContext, useEffect, useState } from 'react'
// import { Redirect } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
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
        remember: false,
    } )

    const auth = useAuthentication()
    const { validate, errors } = useValidation()

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

        const { email, password, remember } = formData

        const emailValidation = validate( 'email', email )
        const passwordValidation = validate( 'password', password )

        if ( emailValidation && passwordValidation ) {
            auth.signIn( email, password, ! remember )
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
                                            // @ts-ignore
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
                            {
                                auth.isSigningIn && <CircularProgress />
                            }
                            {
                                ! auth.isSigningIn && <>

                                    <FormControlLabel
                                        control={
                                            <Checkbox value="remember" color="primary" />
                                        }
                                        label="Stay signed in for 14 days"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={ { mt: 3, mb: 2 } }
                                        onClick={ handleSubmit }
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
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
