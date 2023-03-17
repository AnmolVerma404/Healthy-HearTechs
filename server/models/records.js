import { Schema, model } from "mongoose";
const RecordSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
      minlength: 3,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    hospitalName: {
      type: String,
      required: true,
      minlength: 3,
    },
    medicalCondition: {
      type: String,
      required: true,
      minlength: 3,
    },
    appointDate: {
      type: String,
      required: true,
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

export const Record = model("record", RecordSchema);
