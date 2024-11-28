// Use sequelize to query the database with javascript/typescript instead of SQL 
import { Sequelize } from "sequelize";

// "postgres://postgres:postgres@localhost:5432/library_management"
const sequelize: Sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'library_management',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432
});

// Authenticate the connection to the database
const connectPostgreDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully");
    } catch (error: any) {
        console.log(`Error while connecting to PostgreSQL: ${error}`);
        process.exit(1);
    }
}

export {connectPostgreDB, sequelize };