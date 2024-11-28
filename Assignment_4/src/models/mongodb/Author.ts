import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IAuthorBase } from "../interfaces/baseInterfaces";

interface IAuthor extends IAuthorBase, Document {
    id: ObjectId;
}

const authorSchema: Schema = new Schema({
    name: { type: String, required: true },
    birthYear: { type: Number, required: true },
    nationality: { type: String, required: true }
});

const Author: mongoose.Model<IAuthor> = mongoose.model<IAuthor>("Author", authorSchema);

export { IAuthor, Author };