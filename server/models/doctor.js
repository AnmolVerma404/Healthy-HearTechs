import { Schema, model } from 'mongoose';

const doctorSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
		},
		specialties: [
			{
				type: Schema.Types.ObjectId,
				required: true,
			},
		],
		location: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
		},
		phone_number: {
			type: String,
			required: true,
			minlength: 1,
		},
		email: {
			type: String,
			required: false,
			minlength: 1,
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

export const Doctor = model('doctor', doctorSchema);
