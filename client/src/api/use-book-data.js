import { useEffect, useReducer, useState } from 'react'
import useFetch from './use-fetch'

export default function useBookData( { bookId = undefined, bookIds = undefined, slug = undefined } ) {
    const bookData = useFetch()

    console.log( 'useBookData', slug, bookData )

    useEffect( () => {
        if ( ! bookId ) {
            return
        }

        bookData.fetch( `/books/id/${ bookId}` )
    }, [ bookId ] )

    useEffect( () => {
        bookData.fetch( '/books', { query: { slug } } )
    }, [ slug ] )

    return {
        get data() {
            return bookData?.data
        },
        get status() {
            const { isFetching, isComplete, isError, ...rest } = bookData
            return { isFetching, isComplete, isError }
        },
        get firstItem() {
            return bookData?.data?.length ? bookData.data[ 0 ] : {}
        },
    }
}
