import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link } from '@mui/material'

export default function NavLink( props ) {
    const { href = undefined, ...rest } = props
    const location = useLocation()

    rest.to = href ? href : rest.to
    const isActive = location.pathname === rest.to ? 'is-active' : ''
    rest.className += ` ${ isActive}`

    return (
        <Link { ...rest } component={ RouterLink } />
    )
}
