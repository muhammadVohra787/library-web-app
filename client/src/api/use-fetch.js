import { useEffect, useReducer, useRef, useState } from 'react'
import dataArray from '@/assets/dummydata.js'

const endpointUrl = 'http://localhost:3000/api'

/**
 * Fake Fetch API for testing
 */
async function getDataFromJsonAsync( url ) {
    const endpointRx = /\/([\w\d]*)(\/([\w]*))?([?].*)?$/i
    console.log( { url } )

    const m = url.match( endpointRx )

    const [ , endpoint, , param, query ] = m

    console.log( { m, endpoint, param, query } )

    // const searchParams = new URLSearchParams( url )

    const data = dataArray.find( ( x ) => x.slug === param )

    return {
        async json() {
            return data
        },
    }
}

// window.fetch = getDataFromJsonAsync

export default function useFetch() {
    /** @type {[Record<string, any>, (prev) => prev ]} */
    const [ results, setResults ] = useState()
    const [ fetchSignal, setFetchSignal ] = useState( 0 )
    const prevQuery = useRef( '' )

    const requestData = useRef( {
        url: '',
        query: {},
        body: {},
        options: {},
    } )

    const initial = { isFetching: false, isComplete: false, isError: false, isInitialized: false }

    const updateFetchStatusReducer = ( state, action = {} ) => {
        switch ( action.status ) {
            case 'isComplete':
                return {
                    isFetching: false,
                    isComplete: true,
                    isError: false,
                    isInitialized: true,
                }
            case 'isError':
                return {
                    isFetching: false,
                    isComplete: false,
                    isError: true,
                    isInitialized: true,
                }
            case 'isFetching':
                return {
                    isFetching: true,
                    isComplete: false,
                    isError: false,
                    isInitialized: true,
                }
            default:
                return {
                    isFetching: false,
                    isComplete: false,
                    isError: false,
                    isInitialized: true,
                }
        }
    }

    /** @type {[any,any]} */
    const [ fetchStatus, updateFetchStatus ] = useReducer( updateFetchStatusReducer, initial )

    // useEffect( () => {
    // }, [] )

    useEffect( () => {
        if ( ! requestData.current.url ) {
            return
        }

        const fetchData = async() => {
            if ( fetchStatus.isFetching ) {
                return
            }

            const query = { ...requestData.current.query }

            if ( query.filter ) {
                query.filter = JSON.stringify( requestData.current.query.filter )
            }

            const queryParams = new URLSearchParams( query )
            const queryString = queryParams.size ? `?${ queryParams }` : ''
            const requestEndpointUrl = endpointUrl + requestData.current.url
            const requestUrl = requestEndpointUrl + queryString

            // Abort if query has not changed
            const stringifiedQuery = JSON.stringify( requestData.current )
            if ( prevQuery.current === stringifiedQuery ) {
                return
            }
            prevQuery.current = stringifiedQuery

            console.log( 'Fetching URL:', requestUrl, ' Query:', query, ' Body:', requestData.current.options?.body )

            updateFetchStatus( { status: 'isFetching' } )

            try {
                const request = await fetch( requestUrl, requestData.current.options )
                const json = await request.json()

                console.log( `Fetched data for URL:`, requestUrl, '\n', json )
                setResults( json )
            }
            catch ( e ) {
                console.error( `FETCH ERROR:\n\n${ e}` )
                updateFetchStatus( { status: 'isError' } )

                return
            }
            updateFetchStatus( { status: 'isComplete' } )
        }

        fetchData()
    }, [ fetchSignal ] )

    const triggerFetch = () => setFetchSignal( ( prev ) => ++prev )

    return {
        get data() {
            return results
        },
        get isFetching() {
            return fetchStatus.isFetching
        },
        get isComplete() {
            return fetchStatus.isComplete
        },
        get isError() {
            return fetchStatus.isError
        },
        get isInitialized() {
            return fetchStatus.isInitialized
        },
        fetch( fetchUrl, params = {} ) {
            updateFetchStatus()

            requestData.current = {
                url: fetchUrl,
                options: params.options,
                body: params.body,
                query: params.query,
            }
            triggerFetch()
        },
        refetch() {
            triggerFetch()
        },
        reset() {
            setResults( undefined )
            updateFetchStatus()
        },
    }
}
