import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/postgreDB";

class Author extends Model {
    public id!: number;
    public name!: string;
    public birth_year!: number;
    public nationality!: string;
}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize, modelName: "Author", tableName: "authors" });

export default Author;