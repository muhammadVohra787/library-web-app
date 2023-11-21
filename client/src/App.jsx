import { Container } from "@mui/material";
import MainRouter from "./main-router";
import Footer from "@/pages/Footer";
import "./App.css";
import Header from "@/pages/Header";

function App() {
    return (
        <Container>
            <Header />
            <MainRouter />
            <Footer />
        </Container>
    );
}

export default App;
