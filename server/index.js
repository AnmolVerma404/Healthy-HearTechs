import mongoose from 'mongoose';
import { app } from './app.js';

const start = async () => {
	mongoose.set('strictQuery', false);
	mongoose
		.connect(process.env.DB_URI)
		.then(() => {
			if (!process.env.JWT_KEY) {
				throw new Error('JWT_KEY must be defined');
			}
			console.log('Database connected!');
			app.listen(process.env.PORT, () => {
				console.log(`Running at http://localhost:${process.env.PORT}`);
			});
		})
		.catch(err => console.log(err));
};

start();
