// api/use-authentication.js
import authContext from './auth-context'
import { useLocalStorage } from './local-storage'
import useAccount from './use-account'
import { useContext, useEffect, useState } from 'react'
import useFetch from './use-fetch'

export default function useAuthentication() {
    const [ isMounted, setIsMounted ] = useState( false )
    const [ isLoading, setIsLoading ] = useState( true )

    const user = useContext( authContext )
    const userData = useAccount()
    const userAuth = useFetch()

    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )
    const [ persistedToken, setPersistedToken ] = useLocalStorage( 'token', '' )

    useEffect( () => {
        if ( ! isMounted ) {
            setIsMounted( true )
        }

        if ( ! persistedUserId && ! user.userId ) {
            setIsLoading( false )
        }

        if ( ( persistedUserId && ! user.userId ) || ( ! userData.status.isInitialized && persistedUserId ) ) {
            user.setUserId( persistedUserId )
            userData.getUserById( persistedUserId )
        }
    }, [ isMounted, persistedUserId, user.userId, userData.status.isInitialized ] )

    useEffect( () => {
        if ( user.userId && user.userId !== persistedUserId ) {
            setPersistedUserId( user.userId )

            if ( ! userData.data ) {
                userData.getUserById( user.userId )
            }
        }
    }, [ user.userId ] )

    useEffect( () => {
        if ( userAuth.isComplete ) {
            if ( isLoading ) {
                setIsLoading( false )
            }

            if ( userAuth.data.success ) {
                console.log( 'Signed in!' )

                user.setUserId( userAuth.data.user._id )
                setPersistedToken( userAuth.data.token )
            }
        }
    }, [ userAuth.isComplete, isLoading ] )

    useEffect( () => {
        if ( isMounted && userAuth.isError ) {
            user.setUserId( null )
        }
    }, [ isMounted, userAuth.isError, userData.error ] )

    return {
        _data: userData.data,
        _status: userData.status,
        get isSignedIn() {
            return !! user.userId
        },
        get signInStatusChange() {
            return userData.status.isComplete
        },
        get signInError() {
            return userAuth.isError
        },
        get isSignInFailed() {
            return userAuth.isComplete && ( ! userData.data || ! userAuth.data.success )
        },
        get isGettingStatus() {
            return isLoading// userAuth.isFetching || ! isMounted
        },
        get userId() {
            return user.userId
        },
        get userData() {
            return userData?.data
        },
        refresh() {
            userData.refetch()
        },
        signIn( email, password ) {
            // userData.signIn( email, password )

            console.log( 'Signing in with email and password:', email, password )
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { email, password } ),
            }
            userAuth.fetch( `/auth/login`, { options } )
        },
        signOut() {
            try {
                user.setUserId( null )
                setPersistedUserId( null )
                userData.clear()
            }
            catch ( error ) {
                console.error( 'Error during sign-out:', error )
            }
        },
    }
}
// signIn(email, password) {
//     return new Promise((resolve, reject) => {
//         userData.signIn(email, password)
//             .then(response => {
//                 if (response.status === 200) {
//                    resolve(response.data);
//                 } else {
//                    reject(new Error('Sign-in failed'));
//                 }
//             })
//             .catch(error => {
//                 reject(error);
//             });
//     });
//  }
