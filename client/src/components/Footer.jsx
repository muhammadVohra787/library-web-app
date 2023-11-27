import { Box, Container, Typography, Link } from '@mui/material'
import EtherealLogo from '@/assets/logo.png'
import BottomPicture from '@/assets/library.jpg'
const Footer = () => {
    return (
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
                <img
                    src={ EtherealLogo }
                    alt="Ethereral Logo"
                />
            </Box>
            <Container maxWidth="md">
                <Typography variant="body2" color="text.secondary">
                    <Link href="/">Home</Link> |{ ' ' }
                    <Link href="/about">About Us</Link> |{ ' ' }
                    <Link href="/contact">Contact Us</Link> |{ ' ' }
                    <Link href="/explore">Explore</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    &copy; { new Date().getFullYear() } Your Website
                </Typography>
            </Container>

            <Box sx={ { width: '15vh', height: '15vh' } }>
                <img
                    src={ BottomPicture }
                    alt="Ethereral Logo"
                />
            </Box>
        </Box>
    )
}

export default Footer
