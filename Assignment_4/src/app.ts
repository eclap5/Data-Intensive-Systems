import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import connectMongoDB from './config/mongoDB';
import { connectPostgreDB, sequelize } from './config/postgreDB'; 
import router from './routes';

const app: Express = express();
const PORT: number = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', router);

app.get('/add', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/add.html'));
});

connectPostgreDB();
connectMongoDB();

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});