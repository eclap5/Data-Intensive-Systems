import { Request, Response, Router } from 'express';
import { User as PostgreUser, Book as PostgreBook, BorrowHistory as PostgreBorrowHistory } from '../models/postgres/associations';
import { IUser, User } from '../models/mongodb/User';
import { Book } from '../models/mongodb/Book';
import { BorrowHistory } from '../models/mongodb/BorrowHistory';

const router: Router = Router();

router.get("/api/:db/users", async (req: Request, res: Response) => {
    const database = req.params.db;
    try {
        const postgresUsers = await PostgreUser.findAll();
        const mongoUsers = await User.find();

        if (database === "postgres") {
            res.json({ postgresUsers });
        } else if (database === "mongodb") {
            res.json({ mongoUsers });
        } else {
            res.json({ postgresUsers, mongoUsers });
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error.' });
    }
});

router.get("/api/:db/books", async (req: Request, res: Response) => {
    const database = req.params.db;
    try {
        const postgresBooks = await PostgreBook.findAll();
        const mongoBooks = await Book.find();
        
        if (database === "postgres") {
            res.json({ postgresBooks });
        } else if (database === "mongodb") {
            res.json({ mongoBooks });
        } else {
            res.json({ postgresBooks, mongoBooks });
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error.' });
    }
});

router.get('/api/:db/borrow-history', async (req: Request, res: Response) => {
    const database = req.params.db;
    try {
        const postgresBorrows = await PostgreBorrowHistory.findAll();
        const mongoBorrows = await BorrowHistory.find();

        const postgreResponse = await Promise.all(
            postgresBorrows.map(async (borrow) => {
            const user = await PostgreUser.findByPk(borrow.dataValues.userId);
            const book = await PostgreBook.findByPk(borrow.dataValues.bookId);
            
            return { ...borrow.toJSON(), 
                user: user?.toJSON(),
                book: book?.toJSON() };
            }
        ));

        const mongoResponse = await Promise.all(
            mongoBorrows.map(async (borrow) => {
                const user = await User.findById(borrow.userId);
                const book = await Book.findById(borrow.bookId);
                return { ...borrow.toJSON(), 
                    user: user?.toJSON(), 
                    book: book?.toJSON() 
                };
            }));

        if (database === "postgres") {
            res.json({ postgreResponse });
        } else if (database === "mongodb") {
            res.json({ mongoResponse });
        } else {
            res.json({ postgreResponse, mongoResponse });
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error.' });
    }
});

router.delete('/api/:db/borrow-history/:id', async (req: Request, res: Response) => {
    const database = req.params.db;
    const id = req.params.id;
    try {
        if (database === "postgres") {
            const borrow = await PostgreBorrowHistory.findByPk(id);
            await borrow?.destroy();
            res.json({ msg: 'Borrow deleted successfully.' });
        } else if (database === "mongodb") {
            await BorrowHistory.findByIdAndDelete(id);
            res.json({ msg: 'Borrow deleted successfully.' });
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error.' });
    }
});

router.post('/api/:db/users', async (req: Request, res: Response) => {
    const database = req.params.db;
    const { name, birthDate, email, phonenumber } = req.body;
    try {
        if (database === "postgres") {
            const user = await PostgreUser.create({ name, email });
            res.json({ user });
        } else if (database === "mongodb") {
            const user = new User({ name, email });
            await user.save();
            res.json({ user });
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error.' });
    }
});

export default router;