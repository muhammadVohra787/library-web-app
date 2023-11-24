import { useLocation } from 'react-router-dom'
import { Link } from '@mui/material'

export default function NavLink( { href, children } ) {
    const location = useLocation()
    const isActive = location.pathname === href ? 'is-active' : ''

    return (
        <Link href={ href } variant="body2" className={ isActive }>
            { children }
        </Link>
    )
}
