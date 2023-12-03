// client/src/api/use-account.js
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
        signIn( email, password ) {
            console.log( 'Signing in with email and password:', email, password )
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }
            userData.fetch(`/auth/login`, { options })
                .then(response => {
                    // Save the token in local storage
                    localStorage.setItem('token', response.data.token )
                })
                .catch(error => {
                    console.error('Error during sign-in:', error )
                });
         },
    };
}
