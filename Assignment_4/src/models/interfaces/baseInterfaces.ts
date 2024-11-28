import { ObjectId } from "mongoose"
import { Optional } from "sequelize"

type ID = string | ObjectId | number

export interface IUserBase {
    id?: ID
    name: string
    birthDate: Date
    phonenumber: string
    email: string
    address: string
}

export interface IAuthorBase {
    id?: ID
    name: string
    birthYear: number
    nationality: string
}

export interface IBookBase {
    id?: ID
    authorId: ID
    title: string
    year: number
    isbn: string
    pages: number
    publisher: string
}

export interface IReviewBase {
    id?: ID
    userId: ID
    bookId: ID
    rating: number
    review: string
    createdAt: Date
}

export interface IBorrowHistoryBase {
    id?: ID
    userId: ID
    bookId: ID
    borrowDate: Date
    returnDate: Date
}

// Export sequelize specific interfaces to satisfy the original sequelize model with interface 
export interface IUserCreation extends Optional<IUserBase, "id"> { }
export interface IAuthorCreation extends Optional<IAuthorBase, "id"> { }
export interface IBookCreation extends Optional<IBookBase, "id"> { }
export interface IReviewCreation extends Optional<IReviewBase, "id"> { }
export interface IBorrowHistoryCreation extends Optional<IBorrowHistoryBase, "id"> { }