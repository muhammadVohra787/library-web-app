import { useState } from 'react'
import {
    Autocomplete,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import dataArray from '../assets/dummydata.js'
import onDescription from '@/pages/Book.jsx'

const ExplorePage = () => {
    const [ searchValue, setSearchValue ] = useState( '' )
    const [ sortOrder, setSortOrder ] = useState( 'asc' ) // Default sorting order is ascending
    const [ sortType, setSortType ] = useState( 'title' ) // Default sorting type is title
    const imageFolder = '../../img/'

    const options = dataArray.flatMap( ( book ) => [ book.title, book.author ] )

    const filteredBooks = dataArray.filter( ( item ) => {
        const lowerSearchValue = searchValue ? searchValue.toLowerCase() : ''
        const searchWords = lowerSearchValue.split( /\s+/ )

        return searchWords.some(
            ( searchWord ) =>
                item.title.toLowerCase().includes( searchWord ) ||
                item.author.toLowerCase().includes( searchWord ),
        )
    } )

    const sortedBooks = [ ...filteredBooks ].sort( ( a, b ) => {
        // Implement sorting logic here
        const propA =
            sortType === 'title'
                ? a.title.toLowerCase()
                : a.author.toLowerCase()
        const propB =
            sortType === 'title'
                ? b.title.toLowerCase()
                : b.author.toLowerCase()

        if ( sortOrder === 'asc' ) {
            return propA.localeCompare( propB )
        }
        return propB.localeCompare( propA )
    } )

    const handleSortToggle = () => {
        // Toggle between ascending and descending order
        setSortOrder( ( prevOrder ) => ( prevOrder === 'asc' ? 'desc' : 'asc' ) )
    }

    const handleSortTypeChange = ( event ) => {
        setSortType( event.target.value )
    }

    return (
        <Container style={ { marginTop: '20px' } }>
            <Container style={ { display: 'flex', alignItems: 'center' } }>
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
                        value={ sortType }
                        label="Sort Type"
                        onChange={ handleSortTypeChange }
                    >
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="author">Author</MenuItem>
                    </Select>
                </FormControl>
            </Container>

            <Container>
                <Grid
                    container
                    spacing={ 4 }
                    columnSpacing={ { xs: 1, sm: 2, md: 3 } }
                >
                    { sortedBooks.map( ( item, index ) => (
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
                                <img
                                    onClick={ () =>
                                        onDescription(
                                            item.title,
                                            item.author,
                                            item.description,
                                            item.tags,
                                            item.stock,
                                            item.selectedFile,
                                        )()
                                    }
                                    height={ 300 }
                                    width={ 230 }
                                    src={ imageFolder + item.selectedFile }
                                    alt="bookImage"
                                    style={ {
                                        display: 'block',
                                        margin: 'auto',
                                        marginTop: '15px',
                                        marginBottom: '15px',
                                    } }
                                />
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
        </Container>
    )
}

export default ExplorePage
