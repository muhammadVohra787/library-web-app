import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn.jsx'
import SignUp from '@/pages/SignUp.jsx'
import Explore from '@/pages/Explore.jsx'
import Book from '@/pages/Book.jsx'
import App from './App'
import Error from './pages/Error'
import Account from './pages/Account'
import ApiTesting from './pages/ApiTesting'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={ <App /> }>
            <Route path='*' element={ <Error /> } />
            <Route path="/" element={ <Home /> } />
            <Route path="/signin" element={ <SignIn /> } />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/book/:bookIdentifier" element={ <Book /> } />
            <Route path="/explore" element={ <Explore /> } />
            <Route path="/account" element={ <Account /> } />
            <Route path="/apitest" element={ <ApiTesting /> } />
        </Route>,
    ),
)

export default router
