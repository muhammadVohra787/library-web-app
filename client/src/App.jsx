import { Container } from "@mui/material"
import MainRouter from "./main-router";
import Footer from "@/components/Footer"
import Header from "./components/Header"
import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from './components/AuthContextProvider'
// import { AuthProvider } from "./api/auth-context";

function App() {
    const DummyFetch = () => {
        useEffect(() => {
            const pingServer = async () => {
                try {
                    const response = await fetch('/ping');
                    const data = await response.text();
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching:', error);
                }
            };

            pingServer();
            const interval = setInterval(pingServer, 10 * 60 * 1000);

            return () => clearInterval(interval);
        }, []);

        return null;
    };
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
