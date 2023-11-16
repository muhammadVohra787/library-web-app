import { createTheme } from '@mui/material'
// import { purple } from '@mui/material/colors';

const dark = createTheme( {
    palette: {
        mode: 'dark',
    },
} )

const light = createTheme( {
    typography: {
    },

    palette: {
        mode: 'light',

        primary: {
            main: '#3f4771',
        },
        secondary: {
            main: '#ff4081',
        },
    },
} )

export default { light, dark }
