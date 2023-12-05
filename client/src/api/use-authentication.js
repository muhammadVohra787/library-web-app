// api/use-authentication.js
import authContext from './auth-context'
import { useContext, useEffect, useState } from 'react'
import useFetch from './use-fetch'

export default function useAuthentication() {
    const [ isLoading, setIsLoading ] = useState( true )
    const auth = useContext( authContext )
    const userData = useFetch()
    const userAuth = useFetch()

    const { isTokenValid, isSessionValid, setIsSessionValid, isTokenExpired, setIsTokenExpired, isUserSignedOut, setIsUserSignedOut } = auth.flags

    useEffect( () => {
        if ( userAuth.isError ) {
            auth.setUserId( null )
        }
    }, [ userAuth.isError ] )

    useEffect( () => {
        if ( userAuth.userId !== null ) {
            setIsLoading( false )
        }
    }, [ auth.userId ] )

    useEffect( () => {
        if ( userAuth.isComplete ) {
            if ( isLoading ) {
                setIsLoading( false )
            }

            if ( userAuth.data.success ) {
                console.log( 'Signed in!' )
                auth.setUserId( userAuth.data.user._id )
                auth.setToken( userAuth.data.jwtDecoded )
                setIsSessionValid( true )

                console.log( userAuth.data.jwtDecoded )
            }
        }
    }, [ userAuth.isComplete, isLoading ] )

    useEffect( () => {
        if ( userAuth.isError ) {
            auth.setUserId( null )
        }
    }, [ userAuth.isError ] )

    // Reset auth flags
    useEffect( () => {
        console.log( 'Token change?', { isTokenExpired, isSessionValid, isTokenValid: isTokenValid } )

        if ( ! isTokenValid && isSessionValid ) {
            console.log( '##### Token has expired. #####' )

            console.log( '##### isUserSignedOut -->', isUserSignedOut )

            setIsSessionValid( false )

            if ( ! isTokenExpired ) {
                console.log( 'setIsTokenExpired.' )
                setIsTokenExpired( true )
            }

            return
        }

        if ( isUserSignedOut ) {
            setIsUserSignedOut( false )
        }

        if ( isTokenExpired ) {
            setIsTokenExpired( false )
        }
    }, [ isTokenValid, isSessionValid, isTokenExpired, isUserSignedOut ] )

    return {
        _data: userAuth.data,
        _status: userAuth.status,

        get isReady() {
            return ! isLoading
        },
        get isTokenExpired() {
            return isTokenExpired
        },
        resetIsTokenExpired() {
            setIsTokenExpired( false )
        },
        get isSignedIn() {
            return isTokenValid
        },
        get signInStatusChange() {
            return userData.isComplete
        },
        get signInError() {
            return userAuth.isError
        },
        get isSignInFailed() {
            return userAuth.isError // && ( ! userData.data || userAuth.data.error )
        },
        get isSigningIn() {
            return userAuth.isFetching
        },
        get isGettingStatus() {
            return isLoading // userAuth.isFetching || ! isMounted
        },
        get userId() {
            return auth.userId
        },
        get userData() {
            if ( ! userData.isInitialized && auth.userId ) {
                const headers = this.getProtectedHeader()
                // userData.getUserById( auth.userId )
            }
            return userData?.data
        },
        refresh() {
            console.log( 'refresh , use-auth' )
            userData.refetch()
        },
        validateSession() {
            if ( ! auth.token ) {
                return false
            }

            // Calc. token expiry date
            const expiryDate = auth?.token?.exp ? new Date( auth.token.exp * 1000 ) : null

            // console.log( expiryDate, ' = = = = = = ', new Date() )
            // console.log( 'expiryDate < new Date() ', expiryDate < new Date() )

            console.log( '### CHECKING JWT ===' )

            if ( ! expiryDate || expiryDate < new Date() ) {
                console.log( 'EXPIRED!' )
                // auth.setToken( '' )
                return false
            }
            return true
        },
        signIn( email, password ) {
            console.log( 'Signing in with email and password:', email, password )
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { email, password } ),
            }
            userAuth.fetch( `/auth/login`, { options }, true )
        },
        // sessionSignOut() {
        //     if ( isSigningOut ) {
        //         return false
        //     }
        //     try {
        //         // debugger
        //         auth.setUserId( '' )
        //         auth.setToken( '' )
        //         userData.reset()
        //         // window.alert( 'Session Expired' ) // not workin
        //         console.log( 'Session expired' )// not working
        //     }
        //     catch ( error ) {
        //         console.error( 'Error during sign-out:', error )
        //     }

        //     setIsSigningOut( true )
        // },
        signOut() {
            try {
                auth.setUserId( '' )
                auth.setToken( '' )
                setIsUserSignedOut( true )
            }
            catch ( error ) {
                console.error( 'Error during sign-out:', error )
            }
        },
        getProtectedHeader() {
            return {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ auth.token }`,
                },
            }
        },
    }
}
