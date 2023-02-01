import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
	return request(app)
		.post('/auth/signup') 
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);
});