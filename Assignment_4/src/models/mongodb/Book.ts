import mongoose, { Document, Schema, ObjectId } from "mongoose";
import { IBookBase } from "../interfaces/baseInterfaces";

interface IBook extends IBookBase, Document {
    id: ObjectId;
}

const bookSchema: Schema = new Schema({
    title: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true },
    year: { type: Number, required: true },
    isbn: { type: String, required: true },
    pages: { type: Number, required: true },
    publisher: { type: String, required: true }
});

const Book: mongoose.Model<IBook> = mongoose.model<IBook>("Book", bookSchema);

export { IBook, Book };