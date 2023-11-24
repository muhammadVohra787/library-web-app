import { Container } from '@mui/material'
import MainRouter from './main-router'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Header2 from './components/Header2'
import { Outlet } from 'react-router-dom'

function App() {
    return (
        <Container>
            <Header2 />
            <Container component="main" maxWidth="xl">
                <Outlet />
            </Container>
            <Footer />
        </Container>
    )
}

export default App
