import express from 'express';
import { body } from 'express-validator';
import { search } from '../controllers/medical.js';

const router = express.Router();

router.get('/', (req, res) => {
	console.log('Welcome to Medical Route');
	res.send('Medical Route');
});

router.post('/search', search);

export default router;
