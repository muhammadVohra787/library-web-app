import { Router } from 'express'
import { getUsers, getUserByID, createUser, updateUser, deleteUser, read } from '../controllers/user.controller.js'
import { signIn, requireSignin, hasAuthorization } from '../controllers/auth.controller.js'

const router = Router()

router.post( '/auth/login', signIn )

router.post( '/user', createUser )

// Called by all routes that utilize the :userid param
router.param( 'userid', getUserByID )

router
    .route( '/user/id/:userid' )
    .get( requireSignin, read )

router
    .route( '/user/:userid' )
    .get( requireSignin, read )
    .put( requireSignin, hasAuthorization, updateUser )
    .delete( requireSignin, hasAuthorization, deleteUser )

router
    .route( '/users' )
    .get( requireSignin, getUsers )

export default router
