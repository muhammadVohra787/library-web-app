import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'

import HeroImg from '@/assets/hero_img.jpg'
import useBookData from '@/api/use-book-data.js'
import { useEffect } from 'react'

const Home = () => {
    const imageFolder = '/book-cover/'
    const heroImage = `${imageFolder}fiction.jpg`
    const adventureSectionImage = `${imageFolder}adventure.jpg`
    const fantasySectionImage = `${imageFolder}fantasy.jpg`

    const fictonBooks = useBookData()
    const fantasyBooks = useBookData()
    const adventureBooks = useBookData()

    useEffect( () => {
        fictonBooks.getBooks( { filter: { tags: 'Fiction' }, limit: 3 } )
        fantasyBooks.getBooks( { filter: { tags: 'Fantasy' }, limit: 3 } )
        adventureBooks.getBooks( { filter: { tags: 'Adventure' }, limit: 3 } )
    }, [] )

    return (
        <Stack spacing={ 5 } mt={ 10 }>
            { /* Welcome Section */ }
            <Box className='hero-container'>
                <img
                    src={ HeroImg }
                    alt="Hero Section"
                    style={ { width: '100%', height: 'auto' } }
                />
                <Grid container
                    className="hero-content"
                    spacing={ 0 }
                    alignItems="center"
                    justifyContent="center"
                >
                    <Stack alignItems="center" spacing={ 1 }>
                        <Typography className="hero-title" component="h2">
                            Welcome to the Ethereal e-book library
                        </Typography>
                        <Typography className="hero-cta" >Start reading today</Typography>
                        <Button className="hero-button" href="/signup">Sign up now!</Button>
                    </Stack>
                </Grid>
            </Box>

            { /* Library Introduction Section */ }
            <Box
                sx={ {
                    backgroundColor: '#f5f5f5',
                    padding: '2rem',
                    borderRadius: '2rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    mt: '2rem',
                    marginBottom: '20px',
                } }
            >
                <Typography variant="h6" gutterBottom>
                    WELCOME TO OUR LIBRARY
                </Typography>
                <Typography variant="body1">
                    Explore a vast collection of books and borrow your favorites
                    today.
                </Typography>
            </Box>

            <Typography variant="h4" gutterBottom>
                <span role="img" aria-label="Fiction Emoji">
                    📚
                </span>{ ' ' }
                Fiction Favorites
            </Typography>
            <Grid container spacing={ 4 }>
                { Array.isArray( fictonBooks.data ) && fictonBooks.data.map( ( book, index ) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }>
                        <Paper elevation={ 3 } sx={ { p: '20px', borderRadius: '10px' } }>
                            <Typography variant="h6">{ book.title }</Typography>
                            <a href={ `/book/${book.slug}` }>
                                <img
                                    height={ '100%' }
                                    width={ 'auto' }
                                    src={ imageFolder + book.thumbnail }
                                    alt="bookImage"
                                    style={ { display: 'block', margin: 'auto', marginTop: '15px', marginBottom: '15px' } }
                                />
                            </a>
                            <Typography variant="body2">Author: { book.author }</Typography>
                            <Typography variant="body2">Available: { book.stock }</Typography>
                        </Paper>
                    </Grid>
                ) ) }
            </Grid>

            { /* Adventure Books Section */ }
            <img
                src={ adventureSectionImage }
                alt="Adventure Section"
                style={ { width: '100%', height: 'auto', marginTop: '20px', marginBottom: '20px' } }
            />
            <Typography variant="h4" gutterBottom>
                <span role="img" aria-label="Adventure Emoji">
                    🚀
                </span>{ ' ' }
                Adventure Escapes
            </Typography>
            <Grid container spacing={ 4 }>
                { Array.isArray( adventureBooks.data ) && adventureBooks.data.map( ( book, index ) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }>
                        <Paper elevation={ 3 } sx={ { p: '20px', borderRadius: '10px' } }>
                            <Typography variant="h6">{ book.title }</Typography>
                            <a href={ `/book/${book.slug}` }>
                                <img
                                    height={ '100%' }
                                    width={ 'auto' }
                                    src={ imageFolder + book.thumbnail }
                                    alt="bookImage"
                                    style={ { display: 'block', margin: 'auto', marginTop: '15px', marginBottom: '15px' } }
                                />
                            </a>
                            <Typography variant="body2">Author: { book.author }</Typography>
                            <Typography variant="body2">Available: { book.stock }</Typography>
                        </Paper>
                    </Grid>
                ) ) }
            </Grid>

            { /* Fantasy Books Section */ }
            <img
                src={ fantasySectionImage }
                alt="Fantasy Section"
                style={ { width: '100%', height: 'auto', marginTop: '20px', marginBottom: '20px' } }
            />
            <Typography variant="h4" gutterBottom>
                <span role="img" aria-label="Fantasy Emoji">
                    🧙‍♂️
                </span>{ ' ' }
                Fantasy Favorites
            </Typography>
            <Grid container spacing={ 4 }>
                { Array.isArray( fantasyBooks.data ) && fantasyBooks.data.map( ( book, index ) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }>
                        <Paper elevation={ 3 } sx={ { p: '20px', borderRadius: '10px' } }>
                            <Typography variant="h6">{ book.title }</Typography>
                            <a href={ `/book/${book.slug}` }>
                                <img
                                    height={ '100%' }
                                    width={ 'auto' }
                                    src={ imageFolder + book.thumbnail }
                                    alt="bookImage"
                                    style={ { display: 'block', margin: 'auto', marginTop: '15px', marginBottom: '15px' } }
                                />
                            </a>
                            <Typography variant="body2">Author: { book.author }</Typography>
                            <Typography variant="body2">Available: { book.stock }</Typography>
                        </Paper>
                    </Grid>
                ) ) }
            </Grid>

            { /* Find More Section */ }
            <div style={ { position: 'relative', width: '100%', marginTop: '20px', marginBottom: '20px' } }>
                <img
                    className="forMoreImg"
                    height={ '300vh' }
                    width={ '100%' }
                    src={ `${imageFolder}forMore.jpg` }
                    alt="Find More"
                />
                <div
                    style={ {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    } }
                >
                    <Button variant="contained" color="success">
                        Find More
                    </Button>
                </div>
            </div>
        </Stack>
    )
}

export default Home
