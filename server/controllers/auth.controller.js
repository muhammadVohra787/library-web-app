// // auth.controller.js
// import User from '../models/user.model.js'
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export const signIn = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         console.log( 'signin Reached -auth.controller' )
//         if (user && !isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         // Generate and send a response upon successful authentication
//         res.json({ success: true, user });
//     } catch (error) {
//         console.error('Error signing in:', error);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// };
