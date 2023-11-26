//user.routes.js
import { Router } from "express";
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from '../controllers/user.controller.js'

const router = Router();

router.get('/users', getUsers);
router.get('/user/id/:userid', getUserByID);

router.post('/user', createUser);



router.put('/user/:userid', updateUser);

router.delete('/user/:userid', deleteUser);

export default router;
