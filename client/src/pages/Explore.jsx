import { useEffect, useState } from 'react'
import {
    Autocomplete,
    Container,
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from '@mui/material'
import dataArray from '../assets/dummydata.js'
import useBookData from '@/api/use-book-data.js'
import NavLink from '@/components/NavLink.jsx'

const ExplorePage = () => {
    const [ searchValue, setSearchValue ] = useState( '' )
    const [ sortOrder, setSortOrder ] = useState( 'asc' ) // Default sorting order is ascending
    const [ sortBy, setSortBy ] = useState( 'title' ) // Default sorting type is title

    const bookRequest = useBookData()

    useEffect( () => {
        bookRequest.getBooks( { sortBy, sortOrder } )
    }, [ sortBy, sortOrder, searchValue ] )

    // Image folder is relative to /public
    const imageFolder = '/book-cover/'

    const options = dataArray.flatMap( ( book ) => [ book.title, book.author ] )

    const handleSortToggle = () => {
        // Toggle between ascending and descending order
        setSortOrder( ( prevOrder ) => ( prevOrder === 'asc' ? 'desc' : 'asc' ) )
    }

    const handleSortTypeChange = ( event ) => {
        setSortBy( event.target.value )
    }

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

    return (
        <Container>
            {
                Array.isArray( bookRequest.data ) && <>
                    <Container>
                        <Stack direction="row" alignItems='center' mb={ 5 }>
                            <Autocomplete
                                style={ { flex: 1 } }
                                disablePortal
                                id="combo-box-demo"
                                options={ options }
                                sx={ { width: 400 } }
                                value={ searchValue }
                                freeSolo // Add the freeSolo prop
                                onChange={ ( event, newValue ) => setSearchValue( newValue ) }
                                renderInput={ ( params ) => (
                                    <TextField
                                        { ...params }
                                        label="Search by Author Or Title"
                                    />
                                ) }
                            />
                            <Button onClick={ handleSortToggle } sx={ { marginLeft: '20px' } }>
                                { sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending' }
                            </Button>
                            <FormControl sx={ { marginLeft: '10px', minWidth: '120px' } }>
                                <InputLabel id="sort-type-label">Sort Type</InputLabel>
                                <Select
                                    labelId="sort-type-label"
                                    id="sort-type"
                                    value={ sortBy }
                                    label="Sort Type"
                                    onChange={ handleSortTypeChange }
                                >
                                    <MenuItem value="title">Title</MenuItem>
                                    <MenuItem value="author">Author</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Container>
                    <Container>
                        <Grid
                            container
                            spacing={ 4 }
                            columnSpacing={ { xs: 1, sm: 2, md: 3 } }
                        >
                            { bookRequest.data.map( ( item, index ) => (
                                <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ index }>
                                    <Paper
                                        className="bookBlock"
                                        elevation={ 3 }
                                        style={ {
                                            padding: '20px',
                                            borderRadius: '10px',
                                        } }
                                    >
                                        <Typography variant="h6" className="titleBook">
                                            { item.title }
                                        </Typography>
                                        <NavLink to={ `/book/${ item.slug}` }>
                                            <img
                                                height={ 400 }
                                                width={ 180 }
                                                src={ imageFolder + item.thumbnail }
                                                alt="bookImage"
                                                style={ {
                                                    display: 'block',
                                                    margin: 'auto',
                                                    marginTop: '15px',
                                                    marginBottom: '15px',
                                                } }
                                            />
                                        </NavLink>
                                        <Typography
                                            variant="body2"
                                            className="bookAuthor"
                                        >
                                            Author: { item.author }
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="bookStock"
                                        >
                                            Available: { item.stock }
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ) ) }
                        </Grid>
                    </Container>
                </>
            }
        </Container>
    )
}

export default ExplorePage
