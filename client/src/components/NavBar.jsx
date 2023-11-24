import { Link, Stack } from '@mui/material'
import NavLink from './NavLink'

export function NavBar() {
    const isActive = window.location.pathname === window.location.pathname ? 'is-active' : ''

    return (
        <Stack component="nav" className="main-menu" direction="row" justifyContent="space-between" flexGrow="1">
            <Stack direction="row" spacing={ 5 } alignItems="center" flexGrow="1">
                <NavLink href="/">
                    Home
                </NavLink>
                <NavLink href="/explore">
                    Explore Books
                </NavLink>
                <NavLink href="/account">
                    My Account
                </NavLink>
            </Stack>
            <Stack direction="row" alignItems="center" className={ isActive }>
                <Link href="/" variant="body2">
                    Sign in/out
                </Link>
            </Stack>
        </Stack>
    )
}
