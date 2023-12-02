//api/use-account.js
import useFetch from './use-fetch'

export default function useAccount() {
    const userData = useFetch()

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
            userData.fetch( `/user/id/${ userId}` )
        },
        getUserByEmail( email, password ) {
            userData.fetch( `/users`, { query: { email, password } } )
        },
        createUser( { name, email, password } ) {
            console.log( { name, email,password } )

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
            const options = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { name, email, password } ),
            }

            userData.fetch( `/user/${ userId}`, { options } )
        },
        signIn(email, password) {
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            };

            userData.fetch( `/users`, { query: { email, password } } )
        },

    }
}
