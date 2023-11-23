import React from 'react'
import {
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Chip,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material'

const Book = ( {
    title,
    author,
    description,
    tags,
    stock,
    selectedFile,
} ) => {
    const handleBuyNow = () => {
        // Add your logic for handling the "Buy Now" action
        console.log( 'Buy Now clicked' )
    }

    return (
        <Container style={ { marginTop: '20px' } }>
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } md={ 6 }>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            image={ selectedFile }
                            alt={ title }
                        />
                    </Card>
                </Grid>
                <Grid item xs={ 12 } md={ 6 }>
                    <Paper style={ { padding: '20px', borderRadius: '10px' } }>
                        <Typography variant="h4" gutterBottom>
                            { title }
                        </Typography>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            gutterBottom
                        >
                            by { author }
                        </Typography>
                        <Typography variant="body1" paragraph>
                            { description }
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Tags:
                        </Typography>
                        <div style={ { marginBottom: '20px' } }>
                            { tags.map( ( tag ) => (
                                <Chip
                                    key={ tag }
                                    label={ tag }
                                    style={ { marginRight: '8px' } }
                                />
                            ) ) }
                        </div>
                        <Typography variant="subtitle1" gutterBottom>
                            Stock: { stock }
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ handleBuyNow }
                            style={ { marginTop: '20px' } }
                        >
                            Buy Now
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Book
