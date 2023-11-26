import { createContext } from 'react'
const authContext = createContext( { userId: null, setUserId: null } )
export default authContext
