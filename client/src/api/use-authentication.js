// api/use-authentication.js
import authContext from './auth-context'
import useAccount from './use-account'
import { useContext, useEffect, useState } from 'react'
import useFetch from './use-fetch'

export default function useAuthentication() {
    // const [ isMounted, setIsMounted ] = useState( false )
    const [ isLoading, setIsLoading ] = useState( true )

    const auth = useContext( authContext )
    const userData = useAccount()
    const userAuth = useFetch()

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
                auth.setToken( userAuth.data.token )
            }
        }
    }, [ userAuth.isComplete, isLoading ] )

    useEffect( () => {
        if ( userAuth.isError ) {
            auth.setUserId( null )
        }
    }, [ userAuth.isError ] )

    return {
        _data: userAuth.data,
        _status: userAuth.status,

        get isReady() {
            return ! isLoading
        },
        get isSignedIn() {
            return auth.checkToken()
        },
        get signInStatusChange() {
            return userData.status.isComplete
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
            if ( ! userData.status.isInitialized && auth.userId ) {
                userData.getUserById( auth.userId )
            }
            return userData?.data
        },
        refresh() {
            userData.refetch()
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
        signOut() {
            try {
                auth.setUserId( '' )
                auth.setToken( '' )
                userData.clear()
            }
            catch ( error ) {
                console.error( 'Error during sign-out:', error )
            }
        },
    }
}
