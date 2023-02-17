import { Schema, model } from 'mongoose';

const diseaseSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
		},
		symptoms_id: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		causes_id: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		appointment_id: {
			type: Schema.Types.ObjectId,
			required: false,
		},
		treatment_id:{
			type: Schema.Types.ObjectId,
			required: false,
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

export const Diseases = model('diseases', diseaseSchema);
