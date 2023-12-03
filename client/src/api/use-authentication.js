//api/use-authentication.js
import authContext from './auth-context'
import { useLocalStorage } from './local-storage'
import useAccount from './use-account'
import { useContext, useEffect, useState } from 'react'
import useFetch from './use-fetch';

export default function useAuthentication() {
    const userData1 = useFetch();
    const [ isMounted, setIsMounted ] = useState( false )
    const [ isLoading, setIsLoading ] = useState( true )

    const user = useContext( authContext )
    const userData = useAccount()
    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )


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
        if ( userData.status.isComplete && ! user.userId && userData.data ) {
            user.setUserId( userData.data._id )
        }

        if ( userData.status.isComplete && isLoading ) {
            setIsLoading( false )
        }
    }, [ userData.status.isComplete, user.userId, isLoading ] )

    useEffect(() => {
        if ( isMounted && userData.status.isError) {
            user.setUserId( null );
        }
    }, [isMounted, userData.status.isError, userData.error]);

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
            return userData.status.isError
        },
        get isSignInFailed() {
            return userData.status.isComplete && ( ! userData.data || ! Object.keys( userData.data ).length )
        },
        get isGettingStatus() {
            return isLoading// userData.status.isFetching || ! isMounted
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
            userData.signIn( email, password )
        },
        signOut() {
            try {
                user.setUserId(null)
                setPersistedUserId(null)
                userData.clear()
            } catch ( error ) {
                console.error('Error during sign-out:', error)
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
