import useFetch from './use-fetch'

export default function useBookData() {
    const bookData = useFetch()

    return {
        get data() {
            return bookData?.data ?? []
        },
        get status() {
            const { isFetching, isComplete, isError, ...rest } = bookData
            return { isFetching, isComplete, isError }
        },
        get firstItem() {
            return bookData?.data?.length ? bookData.data[ 0 ] : {}
        },
        getBookBySlug( slug ) {
            const query = {
                filter: {
                    slug,
                },
            }
            bookData.fetch( `/books`, { query } )
        },
        getBookById( bookId ) {
            bookData.fetch( `/books/id/${ bookId}` )
        },
        getBooks( { filter = undefined, sortBy = undefined, sortOrder = undefined, limit = undefined } = {} ) {
            const query = {}

            if ( filter ) {
                query.filter = filter
            }

            if ( sortBy ) {
                query.sortBy = sortBy
            }

            if ( sortOrder ) {
                query.sortOrder = sortOrder
            }

            bookData.fetch( '/books', { query } )
        },
    }
}
