import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IReviewBase } from "../../models/interfaces/baseInterfaces";

interface IReview extends IReviewBase, Document {
    id: ObjectId;
}

const reviewSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    bookId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review: mongoose.Model<IReview> = mongoose.model<IReview>("Review", reviewSchema);

export { IReview, Review };