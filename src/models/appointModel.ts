import { model, Schema, Document, Model } from "mongoose";

export interface IAppointment extends Document {
  userId: string;
  doctorId: string;
  doctorInfo: string;
  userInfo: string;
  date: string;
  status: string;
  time: string;
}

const appointmentSchema: Schema<IAppointment> = new Schema<IAppointment>(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment: Model<IAppointment> = model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;
