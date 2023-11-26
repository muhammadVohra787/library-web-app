import AuthContext from '@/api/auth-context'
import { useState } from 'react'

export function AuthContextProvider( { children } ) {
    const [ userId, setUserId ] = useState()
    return <AuthContext.Provider value={ { userId, setUserId } }>{ children }</AuthContext.Provider>
}
