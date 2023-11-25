import React, { useRef, useState } from 'react'
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Chip,
    Card,
    CardContent,
    CardMedia,
    Stack,
    TextField,
    FormControlLabel,
    InputLabel,
    FormHelperText,
} from '@mui/material'
export default function Account() {
    const [ name, setName ] = useState()

    const [ email, setEmail ] = useState()

    const [ password, setPassword ] = useState()

    const resetHandler = () => {

    }
    const saveHandler = ( ) =>{

    }

    const onNameChange = ( event ) => {
        setName( event.target.value )
    }

    const onEmailChange = ( event ) => {
        setEmail( event.target.value )
    }

    const onPasswordChange = ( event ) =>{
        setPassword( event.target.value )
    }

    return (
        <Container style={ { marginTop: '20px' } }>
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } md={ 6 }>
                    <Box p={ 5 }>
                        <Typography variant="h4" gutterBottom>
                            User Account Detail
                        </Typography>

                        <Grid container spacing={ 3 } direction="row">
                            <Grid item xs={ 12 } md={ 4 }>
                                <InputLabel>
                                    Name
                                </InputLabel>
                            </Grid>
                            <Grid item xs={ 12 } md={ 8 }>
                                <TextField id="name" fullWidth required value={ name } onChange={ onNameChange } />
                                <FormHelperText>(Enter Full Name)</FormHelperText>
                            </Grid>

                            <Grid item xs={ 12 } md={ 4 }>
                                <InputLabel>
                                    Email
                                </InputLabel>
                            </Grid>
                            <Grid item xs={ 12 } md={ 8 }>
                                <TextField id="email" fullWidth required value ={ email } onChange={ onEmailChange } />
                                <FormHelperText>(Enter Email address)</FormHelperText>
                            </Grid>

                            <Grid item xs={ 12 } md={ 4 }>
                                <InputLabel>
                                    Password
                                </InputLabel>
                            </Grid>
                            <Grid item xs={ 12 } md={ 8 }>
                                <TextField id="password" fullWidth required value={ password } onChange={ onPasswordChange } />
                                <FormHelperText>(Enter password)</FormHelperText>
                            </Grid>
                        </Grid>
                        <Stack direction="row" spacing={ 3 }>
                            <Button variant='contained' onClick={ saveHandler }>Save </Button>
                            <Button onClick={ ResetHandler }> Reset </Button>
                        </Stack>

                    </Box>
                </Grid>
                <Grid item xs={ 12 } md={ 6 }>
                    <Paper style={ { padding: '20px', borderRadius: '10px' } }>
                        <Typography variant="h4" gutterBottom>
                            checkout books
                        </Typography>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
