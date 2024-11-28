import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IBorrowHistoryBase } from "../interfaces/baseInterfaces";

interface IBorrowHistory extends IBorrowHistoryBase, Document {
    id: ObjectId;
}

const borrowHistorySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    bookId: { type: Schema.Types.ObjectId, required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: true }
});

const BorrowHistory: mongoose.Model<IBorrowHistory> = mongoose.model<IBorrowHistory>("BorrowHistory", borrowHistorySchema);

export { IBorrowHistory, BorrowHistory };