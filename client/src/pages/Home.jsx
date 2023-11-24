import dataArray from '../assets/dummydata.js'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Box, Button, Typography } from '@mui/material'

const Home = () => {
    const imageFolder = '/book-cover/'
    // Categorize the books
    const fictionBooks = dataArray.filter( ( book ) => book.tags.includes( 'Fiction' ) ).slice( 0, 3 )
    const adventureBooks = dataArray.filter( ( book ) => book.tags.includes( 'Adventure' ) ).slice( 0, 3 )
    const fantasyBooks = dataArray.filter( ( book ) => book.tags.includes( 'Fantasy' ) ).slice( 0, 3 )
    const welcomeImage = `${imageFolder }landing1.png`
    const heroImage = `${imageFolder}fiction.jpg` // Placeholder image
    const adventureSectionImage = `${imageFolder}adventure.jpg` // Placeholder image
    const fantasySectionImage = `${imageFolder}fantasy.jpg` // Placeholder image

    return (
        <div>
            { /* Hero Section */ }

            <img
                src={ welcomeImage }
                alt="Hero Section"
                style={ { width: '100%', height: 'auto' } }
            />
            { /* Welcome Section */ }
            <Box
                style={ {
                    backgroundColor: '#f5f5f5',
                    padding: '2rem',
                    borderRadius: '2rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                } }
            >
                <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    style={ {
                        fontFamily: 'Bebas Neue',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#3e3e3e',
                    } }
                >
                    WELCOME TO OUR LIBRARY
                </Typography>
                <Typography
                    variant="body1"
                    component="div"
                    style={ {
                        fontFamily: 'Bebas Neue',
                        fontSize: '1rem',
                        color: '#555',
                    } }
                >
                    Explore a vast collection of books and borrow your favorites
                    today.
                </Typography>
            </Box>

            { /* Fiction Books Section */ }
            <img
                src={ heroImage }
                alt="Hero Section"
                style={ { width: '100%', height: 'auto' } }
            />
            <Typography
                variant="h4"
                component="div"
                gutterBottom
                style={ {
                    fontFamily: 'Bebas Neue',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#3e3e3e',
                    marginTop: '2rem',
                } }
            >
                <span role="img" aria-label="Fiction Emoji">
                    📚
                </span>{ ' ' }
                Fiction Favorites
            </Typography>
            <Grid container spacing={ 4 } columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                { fictionBooks.map( ( book, index ) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }>
                        { /* Render Fiction Books */ }
                        <Paper
                            className="bookBlock"
                            elevation={ 3 }
                            style={ { padding: '20px', borderRadius: '10px' } }
                        >
                            <Typography variant="h6" className="titleBook">
                                { book.title }
                            </Typography>
                            <img
                                height={ 300 }
                                width={ 230 }
                                src={ imageFolder + book.thumbnail }
                                alt="bookImage"
                                style={ {
                                    display: 'block',
                                    margin: 'auto',
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                } }
                            />
                            <Typography variant="body2" className="bookAuthor">
                                Author: { book.author }
                            </Typography>
                            <Typography variant="body2" className="bookStock">
                                Available: { book.stock }
                            </Typography>
                        </Paper>
                    </Grid>
                ) ) }
            </Grid>

            { /* Adventure Books Section */ }
            <img
                src={ adventureSectionImage }
                alt="Adventure Section"
                style={ { width: '100%', height: 'auto', marginTop: '2rem' } }
            />
            <Typography
                variant="h4"
                component="div"
                gutterBottom
                style={ {
                    fontFamily: 'Bebas Neue',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#3e3e3e',
                    marginTop: '2rem',
                } }
            >
                <span role="img" aria-label="Adventure Emoji">
                    🚀
                </span>{ ' ' }
                Adventure Escapes
            </Typography>
            <Grid container spacing={ 4 } columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                { adventureBooks.map( ( book, index ) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }>
                        { /* Render Adventure Books */ }
                        <Paper
                            className="bookBlock"
                            elevation={ 3 }
                            style={ { padding: '20px', borderRadius: '10px' } }
                        >
                            <Typography variant="h6" className="titleBook">
                                { book.title }
                            </Typography>
                            <img
                                height={ 300 }
                                width={ 230 }
                                src={ imageFolder + book.thumbnail }
                                alt="bookImage"
                                style={ {
                                    display: 'block',
                                    margin: 'auto',
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                } }
                            />
                            <Typography variant="body2" className="bookAuthor">
                                Author: { book.author }
                            </Typography>
                            <Typography variant="body2" className="bookStock">
                                Available: { book.stock }
                            </Typography>
                        </Paper>
                    </Grid>
                ) ) }
            </Grid>

            { /* Fantasy Books Section */ }
            <img
                src={ fantasySectionImage }
                alt="Fantasy Section"
                style={ { width: '100%', height: 'auto', marginTop: '2rem' } }
            />
            <Typography
                variant="h4"
                component="div"
                gutterBottom
                style={ {
                    fontFamily: 'Bebas Neue',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#3e3e3e',
                    marginTop: '2rem',
                } }
            >
                <span role="img" aria-label="Fantasy Emoji">
                    🧙‍♂️
                </span>{ ' ' }
                Fantasy Favorites
            </Typography>
            <Grid container spacing={ 4 } columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                { fantasyBooks.map( ( book, index ) => (
                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }>
                        { /* Render Fantasy Books */ }
                        <Paper
                            className="bookBlock"
                            elevation={ 3 }
                            style={ { padding: '20px', borderRadius: '10px' } }
                        >
                            <Typography variant="h6" className="titleBook">
                                { book.title }
                            </Typography>
                            <img
                                height={ 300 }
                                width={ 230 }
                                src={ imageFolder + book.thumbnail }
                                alt="bookImage"
                                style={ {
                                    display: 'block',
                                    margin: 'auto',
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                } }
                            />
                            <Typography variant="body2" className="bookAuthor">
                                Author: { book.author }
                            </Typography>
                            <Typography variant="body2" className="bookStock">
                                Available: { book.stock }
                            </Typography>
                        </Paper>
                    </Grid>
                ) ) }
            </Grid>

            { /* Find More Section */ }
            <div style={ { position: 'relative', width: '100%' } }>
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
                    <Button
                        className="findMoreButton"
                        variant="contained"
                        color="success"
                        style={ { outline: 'none' } }
                    >
                        Find More
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
