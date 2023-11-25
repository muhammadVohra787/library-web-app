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
    // const [ url, setUrl ] = useState( '' )

    const requestData = useRef( {
        url: '',
        query: {},
        body: {},
        options: {},
    } )

    const initial = { isFetching: false, isComplete: false, isError: false }

    const reducer = ( state, action ) => {
        switch ( action.status ) {
            case 'isComplete':
                return {
                    isFetching: false,
                    isComplete: true,
                    isError: false,
                }
            case 'isError':
                return {
                    isFetching: false,
                    isComplete: false,
                    isError: true,
                }
            case 'isFetching':
                return {
                    isFetching: true,
                    isComplete: false,
                    isError: false,
                }
        }
        return state
    }

    /** @type {[any,any]} */
    const [ fetchStatus, updateFetchStatus ] = useReducer( reducer, initial )

    const triggerFetch = () => setFetchSignal( ( prev ) => ++prev )

    console.log( 'useFetch', { fetchSignal } )

    useEffect( () => {
        if ( ! requestData.current.url ) {
            return
        }

        const fetchData = async() => {
            const options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify( data ), // body data type must match "Content-Type" header
            }

            requestData.current.options = {
                referrerPolicy: 'no-referrer',
            }

            const query = new URLSearchParams( requestData.current.query )
            const queryString = query.size ? `?${ new URLSearchParams( requestData.current.query )}` : ''
            const requestUrl = endpointUrl + requestData.current.url + queryString

            console.log( 'Fetching URL:', requestUrl )
            updateFetchStatus( { status: 'isFetching' } )

            // await new Promise( ( r ) =>{
            //     setTimeout( () => r(), 3000 )
            // } )

            try {
                const request = await fetch( requestUrl, requestData.current.options )
                const json = await request.json()

                console.log( 'json', json )
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
        fetch( fetchUrl, params = {} ) {
            // setUrl( fetchUrl )
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
    }
}
