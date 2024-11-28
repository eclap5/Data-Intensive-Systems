import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/postgreDB";

class Author extends Model {
    public id!: number;
    public name!: string;
    public birthYear!: number;
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
    birthYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, tableName: "authors" });

export { Author };