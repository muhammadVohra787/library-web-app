/**
 * Note: the entrypoint is server.js
 */
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

// ### Import routes here ###
import userRoutes from './routes/user.routes.js'
import booksRoutes from './routes/books.routes.js'
import loanRoutes from './routes/loan.routes.js'

const app = express()
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

// ### Route handlers ###
// app.use( '/', userRoutes )
app.use('/api', userRoutes);
app.use('/api', booksRoutes);
app.use('/api', loanRoutes);

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( cookieParser() )
app.use( compress() )
app.use( helmet() )
app.use( cors() )

app.use( ( err, req, res, next ) => {
    if ( err.name === 'UnauthorizedError' ) {
        res.status( 401 ).json( { error: `${err.name }: ${ err.message}` } )
    }
    else if ( err ) {
        res.status( 400 ).json( { error: `${err.name }: ${ err.message}` } )
        console.log( err )
    }
} )
export default app
