import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn.jsx'
import SignUp from '@/pages/SignUp.jsx'
import Explore from '@/pages/Explore.jsx'
import Book from '@/pages/Book.jsx'
import App from './App'
import Error from './pages/Error'
import Account from './pages/Account'
import Test from './pages/Test'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={ <App /> }>
            <Route path='*' element={ <Error /> } />
            <Route path="/" element={ <Home /> } />
            <Route path="/signin" element={ <SignIn /> } />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/book/:slug" element={ <Book /> } />
            <Route path="/explore" element={ <Explore /> } />
            <Route path="/account" element={ <Account /> } />
            <Route path="/test" element={ <Test /> } />
        </Route>,
    ),
)

export default router
