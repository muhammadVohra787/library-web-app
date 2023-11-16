import { useState } from 'react'
import Alert from '@mui/material/Alert'
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone'
import { blue, purple } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import ToggleColourMode from '@/components/toggle-colour-mode'

function CustomCard( { children } ) {
    return (
        <Card sx={ { display: 'flex', flexDirection: 'column' } }>
            { children }
        </Card>
    )
}

function CustomCardContent( { children } ) {
    return (
        <CardContent sx={ { display: 'flex', flexDirection: 'column', flex: '1', minWidth: 300, maxWidth: 300 } }>
            { children }
        </CardContent>
    )
}

export default function Home() {
    const [ count, setCount ] = useState( 0 )

    return (
        <Stack spacing={ 8 } pb={ 10 }>
            <Stack sx={ { alignItems: 'center' } }>
                <Box>
                    <LocalLibraryTwoToneIcon />
                    <LocalLibraryTwoToneIcon color="primary" />
                    <LocalLibraryTwoToneIcon color="secondary" />
                    <LocalLibraryTwoToneIcon color="success" />
                    <LocalLibraryTwoToneIcon color="action" />
                    <LocalLibraryTwoToneIcon color="disabled" />
                    <LocalLibraryTwoToneIcon sx={ { color: purple[ 500 ] } } />
                </Box>
                <Box mb={ 4 }>
                    <h1>Library App</h1>
                </Box>
            </Stack>
            <Divider />

            <Alert severity="success">{ `Hello, I'm an alert` }</Alert>

            <Stack direction="row" spacing={ 2 } p={ 4 } sx={ { background: blue[ 900 ] } } justifyContent="center" alignItems="stretch">
                <CustomCard>
                    <CardHeader title="Colour Mode" />
                    <CustomCardContent>
                        <Typography sx={ { fontSize: 16 } } color="text.primary" gutterBottom component="h3">
                            Switch colour mode
                        </Typography>
                        <ToggleColourMode />
                    </CustomCardContent>
                    <CardActions>
                        <Button size="small">Useless button</Button>
                    </CardActions>
                </CustomCard>
                <CustomCard>
                    <CardHeader title="Material UI" />
                    <CustomCardContent>
                        <Box
                            sx={ {
                                flex: '1',
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
                            <Button variant="contained" href="https://mui.com/material-ui/getting-started/" target="_blank">Documentation</Button>
                        </Box>
                    </CustomCardContent>
                    <CardActions>
                        <Button size="small">Useless button</Button>
                    </CardActions>
                </CustomCard>
                <CustomCard>
                    <CardHeader title="Click Me" />
                    <CustomCardContent>
                        <Box p={ 5 } pt={ 2 } textAlign="center">
                            <Typography sx={ { fontSize: 16 } } color="text.primary" gutterBottom component="h3">
                                Come on, you want to click the button
                            </Typography>
                            <Box mt={ 3 }>
                                <button onClick={ () => setCount( ( _count ) => _count + 1 ) }>
                                    count is { count }
                                </button>
                            </Box>
                        </Box>
                    </CustomCardContent>
                </CustomCard>
            </Stack>

            <Box>
                <h2>Grid example</h2>
                <Grid container rowSpacing={ 2 } columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                    <Grid item xs={ 8 }>
                        <Box border={ 1 } p={ 2 }>A</Box>
                    </Grid>
                    <Grid item xs={ 4 }>
                        <Box border={ 1 } p={ 2 }>B</Box>
                    </Grid>
                    <Grid item xs={ 4 }>
                        <Box border={ 1 } p={ 2 }>C</Box>
                    </Grid>
                    <Grid item xs={ 8 }>
                        <Box border={ 1 } p={ 2 }>D</Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={ { background: purple[ 200 ] } } p={ 10 }>{ `I'm a purple box` }</Box>
        </Stack>
    )
}
