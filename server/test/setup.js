import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app.js';

let mongo;
beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();
	mongoose.set('strictQuery', false);
	await mongoose.connect(mongoUri);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});
