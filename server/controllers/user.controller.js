// user.controller.js
import extend from 'lodash/extend.js'
import User from '../models/user.model.js'
import errorHandler from './error.controller.js'

export const getUsers = async( req, res ) => {
    const { email } = req.query
    const query = {}

    if ( email ) {
        query.email = email
    }

    // Exclude hashed_password and salt
    const users = User.find( query ).select( [ '-hashed_password', '-salt' ] )
    const results = await users
    res.json( results )
}

export const getUserByID = async( req, res ) => {
    // Exclude hashed_password and salt
    // const user = User.findById( req.params.userid )

    // TODO: Exclude hashed_password and salt from results
    // This works once, then crashes
    const user = User.findById( req.params.userid ).select( [ '-hashed_password', '-salt' ] )

    const results = await user

    if ( ! results ) {
        return res.status( 404 ).json( { message: 'User not found' } )
    }

    res.json( results )
}

export const createUser = async( req, res ) => {
    const user = new User( req.body )

    try {
        await user.save()
        return res.status( 200 ).json( {
            message: 'Successfully signed up!',
        } )
    }
    catch ( error ) {
        console.log( error )
        console.log( 'user-reached controller- Unsuccessful' )
        res.status( 500 ).json( { error: error.message } )
    }
}
export const updateUser = async( req, res ) => {
    const user = await User.findByIdAndUpdate( req.params.userid, req.body, {
        new: true,
    } )
    if ( ! user ) {
        return res.status( 404 ).json( { message: 'User not found' } )
    }
    res.json( user )
}

export const deleteUser = async( req, res ) => {
    const user = await User.findByIdAndDelete( req.params.userid )
    if ( ! user ) {
        return res.status( 404 ).json( { message: 'User not found' } )
    }
    res.json( user )
}

// export const signIn = async( req, res ) => {
//     const { email, password } = req.body
//     console.log( 'Trying to sign in server reached' )

//     try {
//         const user = await User.findOne( { email } )

//         if ( ! user ) {
//             return res.status( 401 ).json( { error: 'Invalid email or password' } )
//         }

//         const isPasswordValid = await bcrypt.compare( password, user.password )

//         if ( ! isPasswordValid ) {
//             return res.status( 401 ).json( { error: 'Invalid email or password' } )
//         }

//         res.json( { success: true } )
//     }
//     catch ( error ) {
//         console.error( 'Error signing in:', error )
//         res.status( 500 ).json( { success: false, error: 'Internal Server Error' } )
//     }
// }

const update = async( req, res ) => {
    try {
        let user = req.profile
        user = extend( user, req.body )
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json( user )
    }
    catch ( err ) {
        return res.status( 400 ).json( {
            error: errorHandler.getErrorMessage( err ),
        } )
    }
}
const remove = async( req, res ) => {
    try {
        const user = req.profile
        const deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json( deletedUser )
    }
    catch ( err ) {
        return res.status( 400 ).json( {
            error: errorHandler.getErrorMessage( err ),
        } )
    }
}
