import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'

import HeroImg from '@/assets/hero_img.jpg'
import HeroImg2 from '@/assets/hero_img_2.jpg'
import useBookData from '@/api/use-book-data.js'
import { useEffect } from 'react'
import NavLink from '@/components/NavLink'

const Home = () => {
    const imageFolder = '/book-cover/'
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
        <Stack spacing={ 10 } mt={ 10 }>
            { /* Welcome Section */ }
            <Box className='hero-container'>
                <img
                    src={ HeroImg }
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
            <section>
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
            </section>

            <Stack component="section" spacing={ 5 }>
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

                                <NavLink to={ `/book/${book.slug}` }>
                                    <img
                                        height={ '100%' }
                                        width={ 'auto' }
                                        src={ imageFolder + book.thumbnail }
                                        alt="bookImage"
                                        style={ { display: 'block', margin: 'auto', marginTop: '15px', marginBottom: '15px' } }
                                    />
                                </NavLink>
                                <Typography variant="body2">Author: { book.author }</Typography>
                                <Typography variant="body2">Available: { book.stock }</Typography>
                            </Paper>
                        </Grid>
                    ) ) }
                </Grid>
            </Stack>
            <Stack component="section" spacing={ 5 }>
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
                                <NavLink to={ `/book/${book.slug}` }>
                                    <img
                                        height={ '100%' }
                                        width={ 'auto' }
                                        src={ imageFolder + book.thumbnail }
                                        alt="bookImage"
                                        style={ { display: 'block', margin: 'auto', marginTop: '15px', marginBottom: '15px' } }
                                    />
                                </NavLink>
                                <Typography variant="body2">Author: { book.author }</Typography>
                                <Typography variant="body2">Available: { book.stock }</Typography>
                            </Paper>
                        </Grid>
                    ) ) }
                </Grid>
            </Stack>

            <Stack component="section" spacing={ 5 }>
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
                                <NavLink to={ `/book/${book.slug}` }>
                                    <img
                                        height={ '100%' }
                                        width={ 'auto' }
                                        src={ imageFolder + book.thumbnail }
                                        alt="bookImage"
                                        style={ { display: 'block', margin: 'auto', marginTop: '15px', marginBottom: '15px' } }
                                    />
                                </NavLink>
                                <Typography variant="body2">Author: { book.author }</Typography>
                                <Typography variant="body2">Available: { book.stock }</Typography>
                            </Paper>
                        </Grid>
                    ) ) }
                </Grid>
            </Stack>

            <Box className='hero-container'>
                <img
                    src={ HeroImg2 }
                    style={ { width: '100%', height: 'auto' } }
                />
                <Grid container
                    className="hero-content"
                    spacing={ 0 }
                    alignItems="center"
                    justifyContent="center"
                >
                    <Stack alignItems="center" spacing={ 1 }>
                        <NavLink asButton variant="contained" color="secondary" to="/explore">
                            Explore more books
                        </NavLink>
                    </Stack>
                </Grid>
            </Box>
        </Stack>
    )
}

export default Home
