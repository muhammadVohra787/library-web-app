import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Button, Link } from '@mui/material'

/**
 * Open links without reloading page.
 *
 * @param {*} props
 */
export default function NavLink( props ) {
    const { href = undefined, asButton = false, ...rest } = props
    const location = useLocation()
    rest.to = href ? href : rest.to

    if ( asButton ) {
        return <Button { ...rest } component={ RouterLink } />
    }

    const isActive = location.pathname === rest.to ? 'is-active' : ''
    rest.className += ` ${ isActive}`

    return <Link { ...rest } component={ RouterLink } />
}
