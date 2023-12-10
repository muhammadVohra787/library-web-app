import { Box, Stack, Typography } from '@mui/material'
import NavLink from './NavLink'

import BannerIllustration from '@/assets/crosslegged_boy.png'

export default function HeroSection() {
    return (
        <Stack direction="row" pb={ 8 } style={ {
            color: '#380980',
        } }>
            <Box maxWidth={ 300 }>
                <img src={ BannerIllustration } alt="Illustration of a boy reading" />
            </Box>
            { /* <Box width={ 400 } style={ {
                    aspectRatio: '1/1',
                    backgroundImage: `url(${BannerIllustration})`,
                    backgroundBlendMode: 'multiply',
                    backgroundSize: 'cover',
                } } /> */ }
            <div
                style={ { flexBasis: '100%', padding: '40px' } }
            >
                <Typography
                    style={ {
                        fontSize: '2.5rem',
                    } }
                >
                    Unlock the world of knowledge with the Ethereal E-library
                    — <br /><b>your gateway to infinite learning.</b>
                </Typography>
                <div style={ { marginTop: '2rem' } }>
                    <NavLink asButton to="/signup" variant="contained" sx={ { padding: '20px', fontSize: '1.5em' } }>Sign up now!</NavLink>
                </div>
            </div>
        </Stack>
    )
}
