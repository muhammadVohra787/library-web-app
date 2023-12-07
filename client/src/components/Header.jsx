import { Alert, Box, Stack } from '@mui/material'
import { NavBar } from './NavBar'
import EtherealLogo from '@/assets/ethereal_logo_with_text.png'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import authContext from '@/api/auth-context'

export default function Header() {
    const location = useLocation()
    const { flags } = useContext( authContext )

    return (
        <Stack mb={ 10 } >
            <Stack direction="row" spacing={ 10 } p={ 2 } alignItems="end">
                <Box width={ 200 }>
                    { /* Visually hidden header for screen readers */ }
                    <Box
                        component={ location.pathname === '/' ? 'h1' : 'span' }
                        className="visuallyhidden"
                    >
                        Ethereral
                    </Box>
                    <a href="/">
                        <img src={ EtherealLogo } alt="Ethereral" />
                    </a>
                </Box>
                <Stack direction="row" pb={ 1 } flexGrow="1">
                    <NavBar />
                </Stack>
            </Stack>
            {
                flags.isUserSignedOut && <>
                    <Alert severity='info'>
                        You have been signed out.
                    </Alert>
                </>
            }
            {
                flags.isTokenExpired && ! flags.isUserSignedOut && <>
                    <Alert severity='warning'>
                        Session has expired, please sign in again.
                    </Alert>
                </>
            }
        </Stack>
    )
}
