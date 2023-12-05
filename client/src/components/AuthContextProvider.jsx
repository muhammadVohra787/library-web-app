// src/compo/authcontextProvider
import AuthContext from '@/api/auth-context'
import { useLocalStorage } from '@/api/local-storage'

export function AuthContextProvider( { children } ) {
    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )
    const [ persistedToken, setPersistedToken ] = useLocalStorage( 'token', '' )

    return <AuthContext.Provider value={ {
        userId: persistedUserId,
        token: persistedToken,
        setToken: setPersistedToken,
        setUserId: setPersistedUserId,
    } }>{ children }</AuthContext.Provider>
}
