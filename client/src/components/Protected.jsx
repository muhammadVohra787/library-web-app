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
    CardMedia,
    Stack,
    TextField,
    FormControlLabel,
    InputLabel,
    FormHelperText,
    Alert,
    CircularProgress,
} from '@mui/material'
import useAuthentication from '@/api/use-authentication'
import NavLink from './NavLink'

export default function Protected( { children, title = undefined, defaultContent = undefined } ) {
    const auth = useAuthentication()

    return (
        auth.isGettingStatus
            ? <Box sx={ { display: 'flex' } }>
                <CircularProgress />
            </Box>
            : (
                auth.isSignedIn
                    ? children
                    : (
                        defaultContent
                            ? { defaultContent }
                            : <Container maxWidth="xs">
                                <Stack spacing={ 3 } mt={ 10 } mb={ 10 } alignItems="stretch">
                                    <Alert severity="warning">
                                        <Typography component="h3">{ title ? title : 'Sign-in required.' }</Typography>
                                    </Alert>
                                    <Stack direction="row" justifyContent="center" spacing={ 3 }>
                                        <NavLink asButton variant="contained" to="/signin">Sign in</NavLink>
                                        <NavLink asButton variant="contained" to="/signup">Sign up</NavLink>
                                    </Stack>
                                </Stack>
                            </Container>
                    )
            )
    )
}
