import useFetch from './use-fetch'
import { useEffect, useReducer, useRef, useState } from 'react'

export default function useAccount() {
    const userData = useFetch()

    return {
        get data() {
            console.log( 'useaccount', userData?.data )
            return Array.isArray( userData.data ) ? userData.data[ 0 ] : userData.data
        },
        get status() {
            const { isFetching, isComplete, isError, isInitialized, ...rest } = userData
            return { isFetching, isComplete, isError, isInitialized }
        },
        clear() {
            userData.reset()
        },
        refetch() {
            userData.refetch()
        },
        getUserById( userId ) {
            userData.fetch( `/user/id/${ userId}` )
        },
        getUserByEmail( email ) {
            userData.fetch( `/users`, { query: { email } } )
        },
        createUser( { name, email } ) {
            console.log( { name, email } )

            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { name, email } ),
            }

            userData.fetch( `/user`, { options } )
        },
        updateUser( userId, { name, email } ) {
            const options = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { name, email } ),
            }

            userData.fetch( `/user/${ userId}`, { options } )
        },

    }
}
