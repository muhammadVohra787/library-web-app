import { Box, Grid, Stack, Typography } from '@mui/material'
import NavLink from './NavLink'

import BannerIllustration from '@/assets/crosslegged_boy.png'

export default function HeroSection() {
    return (
        <Grid container spacing={ 2 } style={ {
            color: '#380980',
        } } pb={ 8 } >
            <Grid item xs={ 12 } sm={ 4 }>
                <img src={ BannerIllustration } alt="Illustration of a boy reading" />
            </Grid>
            <Grid item xs={ 12 } sm={ 8 } display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography
                    style={ {
                        fontSize: '2.5rem',
                        textAlign: 'center',
                    } }
                >
                    Unlock the world of knowledge with the Ethereal E-library
                    <br /><b> — your gateway to infinite learning.</b>
                </Typography>
                <div style={ { marginTop: '2rem', textAlign: 'center' } }>
                    <NavLink asButton to="/signup" variant="contained" sx={ { padding: '20px', fontSize: '1.5em' } }>Sign up now!</NavLink>
                </div>
            </Grid>
        </Grid>

    )
}
