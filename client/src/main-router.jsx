import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Example from '@/routes/example'
import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn.jsx'
import SignUp from '@/pages/SignUp.jsx'
import Explore from '@/pages/Explore.jsx'
import Book from '@/pages/Book.jsx'
import App from './App'

function Root( ) {
    return <p>xyz</p>
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={ <App /> }>
            <Route path="/" element={ <Home /> } />
            <Route path="/signin" element={ <SignIn /> } />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/book/:bookIdentifier" element={ <Book /> } />
            <Route path="/explore" element={ <Explore /> } />
        </Route>,
    ),
)

const MainRouter2 = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/signin" element={ <SignIn /> } />
                <Route path="/signup" element={ <SignUp /> } />
                <Route path="/book/:bookIdentifier" element={ <Book /> } />
                <Route path="/explore" element={ <Explore /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default router
