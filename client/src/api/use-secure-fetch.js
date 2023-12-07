import { useContext } from 'react'
import authContext from './auth-context'
import useFetch from './use-fetch'

/**
 * Wrapper for useFetch. Ensures all requests are sent with authorization headers.
 *
 * @param {boolean} fetchJson Apply default headers for fetching JSON data
 */
export default function useSecureFetch( fetchJson = true ) {
    const auth = useContext( authContext )

    const secureHeaders = {
        Authorization: `Bearer ${ auth.token }`,
    }

    return useFetch( fetchJson, secureHeaders )
}
