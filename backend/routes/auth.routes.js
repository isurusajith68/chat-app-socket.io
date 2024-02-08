import express from 'express';
import { logOut, loginUser, registerUser } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logOut);

export default router;