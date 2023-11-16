import './App.css'

import { Box, Container } from '@mui/system'
import MainRouter from './main-router'

function App() {
    return (
        <Container component="main" maxWidth="lg">
            <Box p={ 4 }>
                <MainRouter />
            </Box>
        </Container>
    )
}

export default App
