import mongoose, { Schema, Document } from "mongoose";

interface IBorrowHistory extends Document {
    userId: number
    bookId: number
    borrowDate: Date
    returnDate: Date
}

const BorrowHistorySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    bookId: { type: Schema.Types.ObjectId },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: false }
});

const BorrowHistory: mongoose.Model<IBorrowHistory> = mongoose.model<IBorrowHistory>("BorrowHistory", BorrowHistorySchema);

export { IBorrowHistory, BorrowHistory };