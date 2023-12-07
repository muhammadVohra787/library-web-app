// client/src/api/use-account.js
import { useContext } from 'react'
import useSecureFetch from './use-secure-fetch'
import authContext from './auth-context'

export default function useAccount() {
    const auth = useContext( authContext )
    const userData = useSecureFetch()

    return {
        get data() {
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
            userData.fetch( `/user/id/${userId}` )
            console.log( `/user/id/${userId}` )
        },
        getUserByEmail( email, password ) {
            console.log( 'Fetching data for /users with email and password:', email, password )
            userData.fetch( `/users`, { query: { email, password } } )
        },
        createUser( { name, email, password } ) {
            console.log( 'Creating user with:', { name, email, password } )

            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { name, email, password } ),
            }

            userData.fetch( `/user`, { options } )
        },
        updateUser( userId, { name, email, password } ) {
            console.log( 'Updating user with userId:', userId )
            const options = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { name, email, password } ),
            }

            userData.fetch( `/user/${userId}`, { options } )
        },
    }
}
