import { useEffect, useReducer, useState } from 'react'
import dataArray from '@/assets/dummydata.js'

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

window.fetch = getDataFromJsonAsync

export default function useFetch() {
    /** @type {[Record<string, any>, (prev) => prev ]} */
    const [ results, setResults ] = useState()
    const [ refetchSignal, setRefetchSignal ] = useState( 0 )
    const [ url, setUrl ] = useState( '' )

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

    useEffect( () => {
        if ( ! url ) {
            return
        }

        const fetchData = async() => {
            updateFetchStatus( { status: 'isFetching' } )
            await new Promise( ( r ) =>{
                setTimeout( () => r(), 3000 )
            } )
            const request = await fetch( url )
            const json = await request.json()

            updateFetchStatus( { status: 'isComplete' } )

            console.log( 'json', json )
            setResults( json )
        }

        fetchData()
    }, [ url, refetchSignal ] )

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
        fetch( fetchUrl ) {
            setUrl( fetchUrl )
        },
        refetch() {
            setRefetchSignal( ( prev ) => prev++ )
        },
    }
}
