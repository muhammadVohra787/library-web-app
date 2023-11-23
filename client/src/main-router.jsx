import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Example from '@/routes/example'
import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn.jsx'
import SignUp from '@/pages/SignUp.jsx'
import Explore from '@/pages/Explore.jsx'
import Description from "@/pages/Description.jsx"

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/signin" element={ <SignIn /> } />
                <Route path="/signup" element={ <SignUp /> } />
                <Route path="/description" element={ < Description /> } />
                <Route path="/explore" element={ <Explore /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter
