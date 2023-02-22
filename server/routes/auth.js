import express from 'express';
import { body } from 'express-validator';
import { signup, login, user, signout } from '../controllers/auth.js';
import { isAuth } from '../middleware/is-auth.js';

const router = express.Router();

router.post(
	'/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email.')
			.normalizeEmail(),
		body('password').trim().isLength({ min: 5 }),
		body('confirmPassword').trim().isLength({ min: 5 }),
		body('name').trim().not().isEmpty(),
	],
	signup
);

router.post('/login', login);

router.post('/user', isAuth, user);

router.post('/signout', signout);

export default router;
