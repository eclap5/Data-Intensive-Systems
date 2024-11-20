// Use sequelize to query the database with javascript instead of SQL 
import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/library_management");

// Authenticate the connection to the database
const connectPostgreDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully");
    } catch (error) {
        console.log(`Error while connecting to PostgreSQL: ${error}`);
        process.exit(1);
    }
}

export {connectPostgreDB, sequelize };