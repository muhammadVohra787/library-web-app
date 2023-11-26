import React from 'react'
import {
    Menu,
    MenuItem,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, Stack } from '@mui/material'
import NavLink from './NavLink'

export function NavBar() {
    const [ anchorEl, setAnchorEl ] = React.useState( null )
    const isMobile = useMediaQuery( '(max-width:1000px)' )

    const handleClick = ( event ) => {
        setAnchorEl( event.currentTarget )
    }

    const handleClose = () => {
        setAnchorEl( null )
    }

    const isActive =
        window.location.pathname === window.location.pathname
            ? 'is-active'
            : ''

    return (
        <Stack
            component="nav"
            className="main-menu"
            direction="row"
            justifyContent={ isMobile ? 'flex-end' : 'space-between' }
            flexGrow="1"
        >
            { isMobile ? (
                <>
                    <IconButton
                        aria-label="menu"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={ handleClick }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={ anchorEl }
                        keepMounted
                        open={ Boolean( anchorEl ) }
                        onClose={ handleClose }
                    >
                        { /* Existing menu items */ }
                        <MenuItem onClick={ handleClose }>
                            <NavLink href="/">Home</NavLink>
                        </MenuItem>
                        <MenuItem onClick={ handleClose }>
                            <NavLink href="/explore">Explore Books</NavLink>
                        </MenuItem>
                        <MenuItem onClick={ handleClose }>
                            <NavLink href="/account">My Account</NavLink>
                        </MenuItem>
                        { /* Added the Sign in/out link to the dropdown menu */ }
                        <MenuItem onClick={ handleClose }>
                            <Link href="/signin" variant="body2">
                                Sign in
                            </Link>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Stack
                    direction="row"
                    spacing={ 5 }
                    alignItems="center"
                    flexGrow="1"
                >
                    { /* Existing navigation links */ }
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/explore">Explore Books</NavLink>
                    <NavLink href="/account">My Account</NavLink>
                    { /* Added the Sign in/out link outside the dropdown for larger screens */ }
                    <Link href="/signin" variant="body2">
                        Sign in
                    </Link>
                </Stack>
            ) }
            { /* Removed the separate stack for the Sign in/out link for mobile view */ }
        </Stack>
    )
}
