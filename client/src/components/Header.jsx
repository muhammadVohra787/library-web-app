import { Box, Link, Stack, Typography } from '@mui/material'
import { NavBar } from './NavBar'
import EtherealLogo from '@/assets/ethereal_logo_with_text.png'
import { useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation()

    return (
        <Stack>
            <Stack direction="row" spacing={ 10 } p={ 2 }>
                <Box width={ 200 }>
                    { /* Visually hidden header for screen readers */ }
                    <Box component={ location.pathname === '/' ? 'h1' : 'span' } className='visuallyhidden'>Ethereral</Box>
                    <img
                        src={ EtherealLogo }
                        alt="Ethereral"
                    />
                </Box>
                <NavBar />
            </Stack>
        </Stack>
    )
}
