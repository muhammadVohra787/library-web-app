import { createContext } from 'react'
const authContext = createContext( {
    userId: null,
    setUserId: null,
    setToken: null,
    checkToken: null,
} )
export default authContext
