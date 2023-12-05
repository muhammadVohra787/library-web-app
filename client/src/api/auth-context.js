import { createContext } from 'react'
const authContext = createContext( {
    userId: null,
    token: null,
    setUserId: null,
    setToken: null,
    // checkToken: null,
} )
export default authContext
