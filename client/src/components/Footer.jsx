import { Box, Container, Typography, Link } from '@mui/material'
import EtherealLogo from '@/assets/logo.png'
import BottomPicture from '@/assets/library.jpg'
const Footer = () => {
    return (
        <Container>
            <Box
                mt={ 20 }
                sx={ {
                    position: 'relative',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffff',
                    padding: '1rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,

                } }
            >
                <Box sx={ { width: '15vh', height: '13vh' } }>
                    <img src={ EtherealLogo } alt="Ethereral Logo" />
                </Box>
                <Container maxWidth="md">
                    <Typography variant="body2" color="text.secondary">
                        <Link href="/">Home</Link> |{ ' ' }
                        <Link href="/explore">Explore Books</Link> |{ ' ' }
                        <Link href="/contact">My Account</Link> |{ ' ' }
                        <Link href="/signup">Sign Up</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        &copy; { new Date().getFullYear() } COMP228 Group 10 (Fall 2023), Centennial College
                    </Typography>
                </Container>

                <Box sx={ { width: '15vh', height: '15vh', margin: '0' } }>
                    <img src={ BottomPicture } alt="Ethereral Logo" />
                </Box>
            </Box>
        </Container>
    )
}

export default Footer
