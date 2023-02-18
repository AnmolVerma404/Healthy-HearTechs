import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', (req, res) => {
	console.log('Welcome to Medical Route');
	res.send('Medical Route');
});

export default router;