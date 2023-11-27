import authContext from './auth-context'
import { useLocalStorage } from './local-storage'
import useAccount from './use-account'
import { useContext, useEffect, useState } from 'react'

export default function useAuthentication() {
    const user = useContext( authContext )
    const userData = useAccount()
    const [ persistedUserId, setPersistedUserId ] = useLocalStorage( 'userId', '' )

    useEffect( () => {
        if ( persistedUserId && ! user.userId ) {
            user.setUserId( persistedUserId )
            userData.getUserById( persistedUserId )
        }
    }, [] )

    useEffect( () => {
        if ( user.userId && user.userId !== persistedUserId ) {
            setPersistedUserId( user.userId )

            if ( ! userData.data ) {
                userData.getUserById( user.userId )
            }
        }
    }, [ user.userId ] )

    useEffect( () => {
        if ( userData.status.isComplete && ! user.userId ) {
            if ( userData.data ) {
                user.setUserId( userData.data._id )
            }
        }
    }, [ userData.status.isComplete ] )

    useEffect( () => {
        if ( userData.status.isError ) {
            user.setUserId( null )
        }
    }, [ userData.status.isError ] )

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
            return userData.status.isFetching || ! userData.status.isInitialized
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
        signIn( email ) {
            userData.getUserByEmail( email )
        },
        signOut() {
            user.setUserId( null )
            setPersistedUserId( null )
            userData.clear()
        },
    }
}
