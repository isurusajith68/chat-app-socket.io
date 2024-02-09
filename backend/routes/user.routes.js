import express from 'express';
import { getUsers } from '../controller/user.controller.js';
import protectedRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectedRoute, getUsers);

export default router;