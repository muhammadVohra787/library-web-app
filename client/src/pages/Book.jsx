import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
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
} from '@mui/material'

import dummyLibraryData from '@/assets/dummydata'
import useBookData from '@/api/use-book-data'

// Temporary solution in lieu of a database API
function getBookFromJson( bookId ) {
    return dummyLibraryData.find( ( b ) => b.slug === bookId )
}

const Book = () => {
    // Get the dynamic part of the URL from the router
    const { slug } = useParams()
    const bookRequest = useBookData()

    useEffect( () => {
        bookRequest.getBookBySlug( slug )
    }, [] )

    if ( bookRequest.status.isFetching ) {
        return (
            <Container style={ { marginTop: '20px', marginBottom: '20px' } }>
                <Paper><Box p={ 3 }>Loading...</Box></Paper>
            </Container>
        )
    }

    // Abort here if the book is not found
    if ( bookRequest.status.isError ) {
        return (
            <Container style={ { marginTop: '20px', marginBottom: '20px' } }>
                <Paper><Box p={ 3 }>Book not found.</Box></Paper>
            </Container>
        )
    }

    const book = bookRequest.firstItem

    const handleBuyNow = () => {
        // Add your logic for handling the "Buy Now" action
        console.log( 'Buy Now clicked' )
    }

    const {
        title,
        author,
        description,
        tags = [],
        stock,
        thumbnail,
    } = book

    const imgFolder = '/book-cover'
    const thumbnailUrl = `${imgFolder}/${ thumbnail}`

    return (
        <Container style={ { marginTop: '20px' } }>
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } md={ 6 }>
                    <Card>
                        <CardMedia
                            component="img"
                            height={ '750px' }
                            width={ 'auto' }
                            image={ thumbnailUrl }
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
                            Borrow
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Book
