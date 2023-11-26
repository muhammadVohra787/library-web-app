import User from '../models/user.model.js'

export const getUsers = async( req, res ) => {
    const name = req.query.name

    if ( name ) {
        const userByName = await User.find( { name: name } )
        res.json( userByName )
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
    const { name, email, password } = req.body
    try {
        const newUser = new User( {
            name,
            email,
            password,
        } )
        const userSaved = await newUser.save()
        res.json( userSaved )
    }
    catch ( error ) {
        console.log( error )
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
