import { Schema, model } from 'mongoose';

const causeSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
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

export const Cause = model('cause', causeSchema);
