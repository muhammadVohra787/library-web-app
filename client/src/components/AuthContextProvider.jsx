// src/compo/authcontextProvider
import AuthContext from '@/api/auth-context'
import { useLocalStorage } from '@/api/local-storage'
import useAuthentication from '../api/use-authentication'
import SessionTimeoutWarningModal from './SessionOut'

// import jwt from 'jsonwebtoken';
export function AuthContextProvider( { children } ) {
    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )
    const [ persistedToken, setPersistedToken ] = useLocalStorage( 'token', '' )
    const auth = useAuthentication()
    const expiryDate = new Date( persistedToken.exp * 1000 )

    const checkToken = () => {
        if ( ! persistedToken || new Date() > expiryDate ) {
            auth.sessionSignOut()
            return false
        }
        console.log( 'Token is available' )
        return true
    }

    return <AuthContext.Provider value={ { userId: persistedUserId, checkToken, setToken: setPersistedToken, setUserId: setPersistedUserId } }>{ children }</AuthContext.Provider>
}
