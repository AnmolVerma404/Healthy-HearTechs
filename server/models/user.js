import { Schema, model } from 'mongoose';

const userSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone_number: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			minlength: 1,
			unique: true,
			trim: true,
		},
		appointment_id: {
			type: Schema.Types.ObjectId,
			required: false,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(_, returnedData) {
				returnedData.id = returnedData._id;
				delete returnedData._id;
			},
		},
	}
);

export const User = model('user', userSchema);
