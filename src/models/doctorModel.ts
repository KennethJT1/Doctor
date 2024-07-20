import { model, Schema, Types, Document, Model } from "mongoose";

export interface IDoctor extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  specialization: string;
  experience: string;
  feesPerConsultation: number;
  status: string;
  timings: any;
}

const doctorSchema: Schema<IDoctor> = new Schema<IDoctor>(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is require"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Work timing is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Doctor: Model<IDoctor> = model<IDoctor>("Doctor", doctorSchema);

export default Doctor;
