import connectMongoDB from '../config/mongoDB';
import { connectPostgreDB } from '../config/postgreDB';

// Import mongodb models
import { Author as AuthorMongo } from '../models/mongodb/Author';
import { Book as BookMongo } from '../models/mongodb/Book';
import { User as UserMongo } from '../models/mongodb/User';
import { Review as ReviewMongo } from '../models/mongodb/Review';
import { BorrowHistory as BorrowHistoryMongo } from '../models/mongodb/BorrowHistory';

// Import postgres models
import { Author as PostgresAuthor } from '../models/postgres/associations';
import { Book as PostgresBook } from '../models/postgres/associations';
import { User as PostgresUser } from '../models/postgres/associations';
import { Review as PostgresReview } from '../models/postgres/associations';
import { BorrowHistory as PostgresBorrowHistory } from '../models/postgres/associations';

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

    await PostgresUser.destroy({ where: {} });
    await PostgresAuthor.destroy({ where: {} });
    await PostgresBook.destroy({ where: {} });
    await PostgresReview.destroy({ where: {} });
    await PostgresBorrowHistory.destroy({ where: {} });

    console.log("PostgreSQL tables cleared");
}

const run = async () => {
    await clearMongoDB();
    await clearPostgreDB();
    process.exit(0);
}

run();