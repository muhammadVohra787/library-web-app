// server/controller/auth.controller
import User from '../models/user.model.js'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { expressjwt } from 'express-jwt'

dotenv.config()

export const signIn = async( req, res ) => {
    const { email, password } = req.body
    console.log( 'auth-controller Reached' )

    try {
        const user = await User.findOne( { email } )
        console.log( 'signin Reached -auth.controller' )
        console.log( password )
        // const passwordsMatch = await bcrypt.compare( password, user.password )

        if ( ! user.authenticate( password ) ) {
            return res
                .status( '401' )
                .send( { error: "Email or password don't match." } )
        }

        const expiry = new Date() + 9999
        const token = jwt.sign( {
            _id: user._id,
            expiry,
        }, config.jwtSecret )

        res.cookie( 't', token, { expire: expiry } )

        // const token = jwt.sign(
        //     {
        //         userId: user._id,
        //         userEmail: user.email,
        //     },
        //     process.env.SECRET_KEY,
        //     { expiresIn: '10s' },
        // )

        const jwtDecoded = jwt.decode( token )
        console.log( jwtDecoded )
        // Send the response back to the client with the token
        return res.status( 200 ).json( { success: true, user, jwtDecoded } )
    }
    catch ( error ) {
        console.error( 'Error signing in:', error )
        // Handle errors and send an appropriate response
        return res.status( 500 ).json( {
            success: false,
            error: 'Internal Server Error',
        } )
    }
}

export const signout = ( req, res ) => {
    res.clearCookie( 't' )
    return res.status( '200' ).json( {
        message: 'signed out',
    } )
}
export const requireSignin = expressjwt( {
    secret: config.jwtSecret,
    algorithms: [ 'HS256' ],
    userProperty: 'auth',
} )

export const hasAuthorization = ( req, res, next ) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if ( ! authorized ) {
        return res.status( '403' ).json( {
            error: 'User is not authorized',
        } )
    }
    next()
}
