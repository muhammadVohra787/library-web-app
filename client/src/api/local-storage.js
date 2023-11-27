import { useState, useEffect, useRef } from 'react'

function getStorageValue( key, defaultValue ) {
    const saved = localStorage.getItem( key )

    try {
        const initial = saved ? JSON.parse( saved ) : null
        return initial || defaultValue
    }
    catch ( e ) {
        return defaultValue
    }
}

export const useLocalStorage = ( key, defaultValue ) => {
    const isMounted = useRef( false )
    const [ value, setValue ] = useState( () => {
        return getStorageValue( key, defaultValue )
    } )

    useEffect( () => {
        if ( value !== defaultValue && value !== undefined ) {
            localStorage.setItem( key, JSON.stringify( value ) )
        }
        isMounted.current = true
    }, [ key, value ] )

    return [ value, setValue ]
}
