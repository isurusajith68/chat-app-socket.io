import express from 'express';
import { getMessages, sendMessages } from '../controller/message.controller.js';
import protectedRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/send/:id', protectedRoute, sendMessages);
router.get('/:id', protectedRoute, getMessages);
// router.get('/getUnread/:id',getUnreadMessages);
// router.get('/getConversations/:id',getConversations);
// router.post('/read/:id',readMessages);
// router.post('/delete/:id',deleteMessages);



export default router;