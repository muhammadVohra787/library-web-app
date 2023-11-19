import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Example from '@/routes/example'
import Home from '@/routes/Home';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    
                     <Home /> 
                     } />
            </Routes>
        </BrowserRouter>
    )
}
export default MainRouter
