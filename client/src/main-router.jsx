import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Example from '@/routes/example'

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Example /> } />
            </Routes>
        </BrowserRouter>
    )
}
export default MainRouter
