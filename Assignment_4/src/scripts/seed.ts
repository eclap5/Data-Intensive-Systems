/**
 * This script is used to populate both databases with random data.
 * The script is using faker module to generate data.
 * Both databases will be populated with 5 items of every model.
 * 
 * To run this script, use the following command:
 * npm run seed
 * 
 */

import connectMongoDB from '../config/mongoDB';
import { connectPostgreDB, sequelize } from '../config/postgreDB';
import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongoose';

// Import base interfaces
import { IUserBase, IAuthorBase, IBookBase, IBorrowHistoryBase, IReviewBase } from '../models/interfaces/baseInterfaces';

// Import postgres specific model interfaces
import { IUserCreation, IAuthorCreation, IBookCreation, IBorrowHistoryCreation, IReviewCreation } from '../models/interfaces/baseInterfaces';

// Import mongodb models
import { Author as AuthorMongo, IAuthor } from '../models/mongodb/Author';
import { Book as BookMongo, IBook } from '../models/mongodb/Book';
import { User as UserMongo, IUser } from '../models/mongodb/User';
import { Review as ReviewMongo, IReview } from '../models/mongodb/Review';
import { BorrowHistory as BorrowHistoryMongo, IBorrowHistory } from '../models/mongodb/BorrowHistory';

// Import postgres models
import { Author as PostgresAuthor } from '../models/postgres/associations';
import { Book as PostgresBook } from '../models/postgres/associations';
import { User as PostgresUser } from '../models/postgres/associations';
import { Review as PostgresReview } from '../models/postgres/associations';
import { BorrowHistory as PostgresBorrowHistory } from '../models/postgres/associations';


const createRandomUser = () => {
    const user: IUserBase = {
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        phonenumber: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress()
    };
    return user;
}

const createRandomAuthor = () => {
    const author: IAuthorBase = {
        name: faker.person.fullName(),
        birthYear: faker.date.between({from: "1900-01-01T00:00:00.000Z", to: "2020-01-01T00:00:00.000Z"}).getFullYear(),
        nationality: faker.location.country(),
    };
    return author;
}

const createRandomBook = (authorId: ObjectId | number) => {
    const book: IBookBase = {
        title: faker.book.title(),
        authorId: authorId,
        year: faker.date.between({from: "1900-01-01T00:00:00.000Z", to: "2020-01-01T00:00:00.000Z"}).getFullYear(),
        isbn: faker.string.alphanumeric({length: 13}),
        pages: faker.number.int({min: 50, max: 5000}),
        publisher: faker.book.publisher()
    };
    return book;
}

const createRandomReview = (userId: ObjectId | number, bookId: ObjectId | number) => {
    const review: IReviewBase = {
        userId: userId,
        bookId: bookId,
        rating: faker.number.float({min: 0, max: 5}),
        review: faker.lorem.sentence(),
        createdAt: faker.date.recent()
    };
    return review;
}

const createRandomBorrowHistory = (userId: ObjectId | number, bookId: ObjectId | number) => {
    const borrowDate: Date = faker.date.past();
    const returnDate: Date = faker.date.between({from: borrowDate, to: "2024-12-31T00:00:00.000Z"});

    const borrowHistory: IBorrowHistoryBase = {
        userId: userId,
        bookId: bookId,
        borrowDate: borrowDate,
        returnDate: returnDate
    };
    return borrowHistory;
}

// Populate MongoDB
const populateMongoDB = async () => {
    await connectMongoDB();

    const userIds: ObjectId[] = [];
    const authorIds: ObjectId[] = [];
    const bookIds: ObjectId[] = [];

    // Populate users
    for (let i = 0; i < 5; i++) {
        const user: IUserBase = createRandomUser();
        const newUser: IUser = new UserMongo(user);
        await newUser.save();

        userIds.push(newUser._id as ObjectId);
    }

    // Populate authors
    for (let i = 0; i < 5; i++) {
        const author: IAuthorBase = createRandomAuthor();
        const newAuthor: IAuthor = new AuthorMongo(author);
        await newAuthor.save();

        authorIds.push(newAuthor._id as ObjectId);
    }

    // Populate books
    for (let i = 0; i < 5; i++) {
        const book: IBookBase = createRandomBook(authorIds[i]);
        const newBook: IBook = new BookMongo(book);
        await newBook.save();

        bookIds.push(newBook._id as ObjectId);
    }

    // Populate reviews
    for (let i = 0; i < 5; i++) {
        const review: IReviewBase = createRandomReview(userIds[i], bookIds[i]);
        const newReview: IReview = new ReviewMongo(review);
        await newReview.save();
    }

    // Populate borrow histories
    for (let i = 0; i < 5; i++) {
        const borrowHistory: IBorrowHistoryBase = createRandomBorrowHistory(userIds[i], bookIds[i]);
        const newBorrowHistory: IBorrowHistory = new BorrowHistoryMongo(borrowHistory);
        await newBorrowHistory.save();
    }

    console.log("MongoDB populated");
}

// Populate PostgreSQL database
const populatePostgreDB = async () => {
    await connectPostgreDB();
    await sequelize.sync({force: true});

    const userIds: number[] = [];
    const authorIds: number[] = [];
    const bookIds: number[] = [];

    // Populate users
    for (let i = 0; i < 5; i++) {
        const user: IUserBase = createRandomUser();
        const newUser = await PostgresUser.create(user as IUserCreation);

        userIds.push(newUser.dataValues.id);
    }

    // Populate authors
    for (let i = 0; i < 5; i++) {
        const author: IAuthorBase = createRandomAuthor();
        const newAuthor = await PostgresAuthor.create(author as IAuthorCreation);

        authorIds.push(newAuthor.dataValues.id);
    }

    // Populate books
    for (let i = 0; i < 5; i++) {
        const book: IBookBase = createRandomBook(authorIds[i]);
        const newBook = await PostgresBook.create(book as IBookCreation);

        bookIds.push(newBook.dataValues.id);
    }

    // Populate reviews
    for (let i = 0; i < 5; i++) {
        const review: IReviewBase = createRandomReview(userIds[i], bookIds[i]);
        await PostgresReview.create(review as IReviewCreation);
    }

    // Populate borrow histories
    for (let i = 0; i < 5; i++) {
        const borrowHistory: IBorrowHistoryBase = createRandomBorrowHistory(userIds[i], bookIds[i]);
        await PostgresBorrowHistory.create(borrowHistory as IBorrowHistoryCreation);
    }

    console.log("PostgreSQL populated");
}


const run = async () => {
    await populateMongoDB();
    await populatePostgreDB();
    process.exit(0);
}

run();