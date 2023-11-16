import { createContext, useMemo, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './index.css'

export const ColourModeContext = createContext( { toggleColourMode: () => {} } )

export default function Theme( { children, themes } ) {
    const [ mode, setMode ] = useState( 'light' )
    const colourMode = useMemo(
        () => ( {
            toggleColourMode: () => {
                setMode( ( prevMode ) => ( prevMode === 'light' ? 'dark' : 'light' ) )
            },
        } ),
        [],
    )

    const theme = useMemo(
        () => createTheme( themes[ mode ] ),
        // Dependency check disabled because "themes" is a static configuration object
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ mode ],
    )

    return (
        <ColourModeContext.Provider value={ colourMode }>
            <ThemeProvider theme={ theme }>
                <CssBaseline />
                { children }
            </ThemeProvider>
        </ColourModeContext.Provider>
    )
}
