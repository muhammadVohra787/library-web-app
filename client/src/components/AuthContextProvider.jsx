// src/compo/authcontextProvider
import AuthContext from '@/api/auth-context'
import { useLocalStorage } from '@/api/local-storage'
import { useRef, useState } from 'react'

export function AuthContextProvider( { children } ) {
    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )
    const [ persistedToken, setPersistedToken ] = useLocalStorage( 'token', '' )

    const [ isSessionValid, setIsSessionValid ] = useState( false )

    const _flags = useRef( {
        isTokenExpired: false,
        isUserSignedOut: false,
    } )

    const flags = {
        get isTokenExpired() {
            return _flags.current.isTokenExpired
        },
        get isUserSignedOut() {
            return _flags.current.isUserSignedOut
        },
        get isSessionValid() {
            return isSessionValid
        },
        setIsSessionValid,
        setIsTokenExpired( value ) {
            _flags.current.isTokenExpired = !! value
        },
        setIsUserSignedOut( value ) {
            _flags.current.isUserSignedOut = !! value
        },
        get isTokenValid() {
            if ( ! persistedToken ) {
                return false
            }

            const expiryDate = new Date( persistedToken?.exp * 1000 )
            if ( expiryDate < new Date() ) {
                return false
            }

            return true
        },
    }

    return <AuthContext.Provider value={ {
        flags,
        userId: persistedUserId,
        token: persistedToken,
        setToken: setPersistedToken,
        setUserId: setPersistedUserId,
    } }>{ children }</AuthContext.Provider>
}
