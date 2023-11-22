import { Container } from '@mui/material'
import MainRouter from './main-router'
import Footer from '@/components/Footer'
import './App.css'
import Header from '@/components/Header'

function App() {
    return (
        <Container>
            <Header />
            <MainRouter />
            <Footer />
        </Container>
    )
}

export default App
