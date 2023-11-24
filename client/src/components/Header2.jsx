import { Box, Link, Stack } from '@mui/material'
import { NavBar } from './NavBar'

export default function Header2() {
    return (
        <Stack>
            <Stack direction="row" spacing={ 10 }>
                <Box><h1>Ethereal</h1></Box>
                <NavBar />
            </Stack>
        </Stack>
    )
}
