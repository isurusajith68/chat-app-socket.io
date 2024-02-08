import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectMongoDB from './db/connectMongoDB.js';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(port, () => {
    connectMongoDB();
    console.log(`Server is running at http://localhost:${port}`);
});