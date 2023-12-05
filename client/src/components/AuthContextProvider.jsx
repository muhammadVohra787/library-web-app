// src/compo/authcontextProvider
import AuthContext from '@/api/auth-context'
import { useLocalStorage } from '@/api/local-storage'
import useAuthentication from '../api/use-authentication'
import SessionTimeoutWarningModal from './SessionOut'

// import jwt from 'jsonwebtoken';
export function AuthContextProvider( { children } ) {
    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )
    const [ persistedToken, setPersistedToken ] = useLocalStorage( 'token', '' )
    // const auth = useAuthentication()

    return <AuthContext.Provider value={ {
}
