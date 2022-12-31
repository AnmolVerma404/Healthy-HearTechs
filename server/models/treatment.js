import { Schema, model } from 'mongoose';

const treatmentSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
		},
		type: {
			type: String,
			required: true,
		}
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

export const Treatment = model('treatment', treatmentSchema);
