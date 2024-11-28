import connectMongoDB from '../config/mongoDB';
import { connectPostgreDB, sequelize } from '../config/postgreDB';

// Import mongodb models
import { Author as AuthorMongo } from '../models/mongodb/Author';
import { Book as BookMongo } from '../models/mongodb/Book';
import { User as UserMongo } from '../models/mongodb/User';
import { Review as ReviewMongo } from '../models/mongodb/Review';
import { BorrowHistory as BorrowHistoryMongo } from '../models/mongodb/BorrowHistory';

// Import postgres models
import { Author as PostgresAuthor } from '../models/postgres/Author';
import { Book as PostgresBook } from '../models/postgres/Book';
import { User as PostgresUser } from '../models/postgres/User';
import { Review as PostgresReview } from '../models/postgres/Review';
import { BorrowHistory as PostgresBorrowHistory } from '../models/postgres/BorrowHistory';

const clearMongoDB = async () => {
    await connectMongoDB();

    await UserMongo.deleteMany({});
    await AuthorMongo.deleteMany({});
    await BookMongo.deleteMany({});
    await ReviewMongo.deleteMany({});
    await BorrowHistoryMongo.deleteMany({});

    console.log("MongoDB collections cleared");
}

const clearPostgreDB = async () => {
    await connectPostgreDB();

    await PostgresUser.truncate();
    await PostgresAuthor.truncate();
    await PostgresBook.truncate();
    await PostgresReview.truncate();
    await PostgresBorrowHistory.truncate();

    console.log("PostgreSQL tables cleared");
}

const run = async () => {
    await clearMongoDB();
    await clearPostgreDB();
    process.exit(0);
}

run();