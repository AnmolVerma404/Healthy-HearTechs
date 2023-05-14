import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import * as dotenv from 'dotenv';

dotenv.config();

import { User } from '../models/user.js';

export const signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed.');
		error.statusCode = 422;
		error.data = errors.array();
		return next(error);
	}
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	const phone_number = req.body.phone_number;
	const confirmPassword = req.body.confirmPassword;
	try {
		const emailExist = await User.findOne({ email: email });
		if (emailExist) {
			const error = new Error(
				'Email already exists. Please try using a different email.'
			);
			error.stausCode = 401;
			throw error;
		}
		if (password.trim() !== confirmPassword.trim()) {
			const error = new Error(
				'Passwords do not match. Please enter carefully!'
			);
			error.statusCode = 401;
			throw error;
		}
		const hashedPw = await bcrypt.hash(password, 12);
		const user = new User({
			email: email,
			password: hashedPw,
			name: name,
			phone_number: phone_number,
		});
		const result = await user.save();
		res.status(201).json({ message: 'User created!', userId: result._id });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			const error = new Error('A user with this email could not be found.');
			error.statusCode = 401;
			throw error;
		}
		loadedUser = user;
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('Wrong password!');
			error.statusCode = 401;
			throw error;
		}
		const token = jwt.sign(
			{
				email: loadedUser.email,
				name:loadedUser.name,
				phone_number:loadedUser.phone_number,
				userId: loadedUser._id.toString(),
			},
			process.env.JWT_KEY,
			{ expiresIn: '1h' }
		);
		// console.log('The token', token);
		res.setHeader('Set-Cookie',cookie.serialize('jwt',token,{
			httpOnly:false,
			domain:'http://localhost:5173/',
			'path':'/'
		}))
		req.session = {
			jwt: token,
		};
		res.status(200).json({ token: token, userId: loadedUser._id.toString(),name:loadedUser.name });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const user = async (req, res, next) => {
	const userData = req.currentUser;
	console.log('User data', userData);
	res.status(200).json({
		success: true,
		message: 'Signed In',
		data: userData,
	});
};

export const signout = async (req, res, next) => {
	req.session = null;
	res.status(200).json({ message: 'Signed Out' });
};
