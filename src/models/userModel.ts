import { model, Schema, Types, Document, Model } from "mongoose";
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken"

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isDoctor?: boolean;
  notifcation?: [];
  seenNotification?: [];

  matchPassword(enteredPassword: string): Promise<boolean>; 
  getSignedJwtToken(): Promise<any>; 

}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 256,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    notifcation: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if(!this.isModified('password')) {
    next();
  };


  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err:any) {
    console.error("Failed to modify password",err);
    next(err);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
