import { Schema, model } from 'mongoose';

const appointmentSchema = Schema(
	{
		doctor_id: {
			type: Schema.Types.ObjectId,
			required: true,
			minlength: 1,
			trim: true,
		},
		date: {
			type: Date,
			default: Date.now(),
			required: true,
		},
		location: {
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

export const Appointment = model('appointment', appointmentSchema);
