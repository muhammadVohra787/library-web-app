//user.controller.js
import User from '../models/user.model.js'

export const getUsers = async( req, res ) => {
    const { email } = req.query

    if ( email ) {
        const userByEmail = await User.find( { email } )
        res.json( userByEmail )
    }
    else {
        const users = await User.find()
        res.json( users )
    }
}

export const getUserByID = async( req, res ) => {
    const user = await User.findById( req.params.userid )
    if ( ! user ) {
        return res.status( 404 ).json( { message: 'User not found' } )
    }
    res.json( user )
}

export const createUser = async( req, res ) => {
    console.log("User routes accessed");
    const { name, email, password } = req.body
    try {
        const newUser = new User( {
            name,
            email,
            password,
        } )
        const userSaved = await newUser.save()
        res.json( userSaved )
        console.log('user-reached controller')
    }
    catch ( error ) {
        console.log( error )
        console.log('user-reached controller- Unsuccessful')
        res.status(500).json({ error: error.message })
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
