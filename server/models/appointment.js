import { Schema, model } from 'mongoose';

const appointmentSchema = Schema(
	{
		doctor_id: {
			type: Schema.Types.ObjectId,
			required: false,
			minlength: 1,
			trim: true,
		},
		date: {
			type: Date,
			default: Date.now(),
			required: true,
		},
		mobile_number: {
			type: String,
			required: false,
		},
		medicine: {
			type: String,
			required: false,
		},
		cause: {
			type: String,
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

export const Appointment = model('appointment', appointmentSchema);
