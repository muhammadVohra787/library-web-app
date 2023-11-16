import { useContext } from 'react'
import { useTheme } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { ColourModeContext } from '@/theme'

export default function ToggleColourMode() {
    const theme = useTheme()
    const colourMode = useContext( ColourModeContext )

    return (
        <Box
            sx={ {
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                border: 1,
                p: 3,
            } }
        >
            { theme.palette.mode } mode
            <IconButton sx={ { ml: 1 } } onClick={ colourMode.toggleColourMode } color="inherit">
                { theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
            </IconButton>
        </Box>
    )
}
