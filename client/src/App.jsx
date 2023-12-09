import { Container } from "@mui/material"
import MainRouter from "./main-router";
import Footer from "@/components/Footer"
import Header from "./components/Header"
import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from './components/AuthContextProvider'
// import { AuthProvider } from "./api/auth-context";

function App() {
    return (
        <AuthContextProvider>
            <Header />
            <Container component="main" maxWidth="xl">
                <Outlet />
            </Container>
            <Footer />
        </AuthContextProvider>
    );
}

export default App;
