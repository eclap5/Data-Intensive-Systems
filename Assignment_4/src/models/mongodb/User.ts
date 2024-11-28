import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IUserBase } from "../interfaces/baseInterfaces";

interface IUser extends IUserBase, Document {
    id: ObjectId;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { IUser, User };