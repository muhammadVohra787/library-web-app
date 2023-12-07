// user.controller.js
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
console.log('server reached');
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

export const createUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash( password, 10 )

        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Save the hashed password
        })

        const userSaved = await newUser.save()
        res.json(userSaved)
        console.log('user-reached controller')
    } catch (error) {
        console.log(error)
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

export const signIn = async (req, res) => {

    const { email, password } = req.body;
    console.log('Trying to sign in server reached');

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
