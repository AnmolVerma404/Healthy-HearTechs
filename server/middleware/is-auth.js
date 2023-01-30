import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const isAuth = function (req, res, next) {
	try {
		const userData = jwt.verify(req.session.jwt, process.env.JWT_KEY);
		req.currentUser = userData;
		next();
	} catch (err) {
		const error = new Error('Sign Up/In first');
		error.statusCode = 401;
		throw error;
	}
};
