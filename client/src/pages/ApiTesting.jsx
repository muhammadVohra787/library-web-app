import useBookData from '@/api/use-book-data'
import useFetch from '@/api/use-fetch'

export default function ApiTesting() {
    const book = useBookData( { bookId: '1984' } )

    console.log( 'BOOK --> ', book )

    return (
        <div>
            <div >Fetching: { book.status.isFetching && 'yes' }</div>
            <div >Complete: { book.status.isComplete && 'yes' }</div>
            <div >Error: { book.status.isError && 'yes' }</div>
        </div>
    )
}
