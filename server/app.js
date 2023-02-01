import express from 'express';
import * as dotenv from 'dotenv';
import cookieSession from 'cookie-session';

import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.set('trust proxy', true);
dotenv.config();

app.use(
	cookieSession({
		keys: process.env.JWT_KEY,
		signed: false,
	})
);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});
export { app };
