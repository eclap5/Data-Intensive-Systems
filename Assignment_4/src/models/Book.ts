import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/postgreDB";
import Author from "./Author";

class Book extends Model {
    public id!: number;
    public author_id!: number;
    public title!: string;
    public year!: number;
    public isbn!: string;
    public pages!: number;
    public publisher!: string;
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Author,
            key: "id"
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: "Book", tableName: "books" });

export default Book;