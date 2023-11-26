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

export default function Authorized( { children, title = undefined, defaultContent = undefined } ) {
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
                                        <Button variant="contained" href="/signin">Sign in</Button>
                                        <Button variant="contained" href="/signup">Sign up</Button>
                                    </Stack>
                                </Stack>
                            </Container>
                    )
            )
    )
}
