import { useEffect, useReducer, useState } from 'react'
import useFetch from './use-fetch'

export default function useBookData( { bookId = undefined, bookIds = undefined, slug = undefined } ) {
    const bookData = useFetch()

    console.log( 'isComplete', bookData.isComplete )

    useEffect( () => {
        if ( ! bookId ) {
            return
        }

        bookData.fetch( `/book/${ bookId}` )
    }, [ bookId ] )

    useEffect( () => {
    }, [ bookIds ] )

    return {
        get data() {
            return {}
        },
        get status() {
            const { isFetching, isComplete, isError, ...rest } = bookData
            return { isFetching, isComplete, isError }
        },
    }
}
