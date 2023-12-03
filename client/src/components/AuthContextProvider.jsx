import AuthContext from '@/api/auth-context'
import { useLocalStorage } from '@/api/local-storage'

export function AuthContextProvider( { children } ) {
    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )
    const [ persistedToken, setPersistedToken ] = useLocalStorage( 'token', '' )

    const checkToken = () => {
        // Check token validity here
        // Check persistedToken and userId
        // Invalidate token with setPersistedToken(null), setUserId(null)

        return !! persistedUserId
    }

    return <AuthContext.Provider value={ { userId: persistedUserId, checkToken, setToken: setPersistedToken, setUserId: setPersistedUserId } }>{ children }</AuthContext.Provider>
}
