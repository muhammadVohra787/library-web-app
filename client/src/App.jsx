import React from 'react';
import { Box, Container } from '@mui/system';
import MainRouter from './main-router';
import Footer from '@/pages/Footer';
import './App.css';
import Header from '@/pages/Header'
function App() {
  return (
    <Container component="main" maxWidth="lg" sx={{ minHeight: '100vh', position: 'relative' }}>
    <Header/>
      <Box p={3}>

        <MainRouter />
        
      </Box>
      <br></br><br></br> <br></br><br></br> <br></br><br></br>
      <Footer />
    </Container>
  );
}

export default App;
