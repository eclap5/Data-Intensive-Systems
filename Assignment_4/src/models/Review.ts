import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
    userId: number
    bookId: number
    rating: number
    review: string
    createdAt: Date
}

const ReviewSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    bookId: { type: Schema.Types.ObjectId },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review: mongoose.Model<IReview> = mongoose.model<IReview>("Review", ReviewSchema);

export { IReview, Review };