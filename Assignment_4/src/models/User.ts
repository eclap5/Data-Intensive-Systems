import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/postgreDB";

class User extends Model {
    public id!: number;
    public name!: string;
    public birthDate!: number;
    public phonenumber!: number;
    public email!: string;
    public address!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    phonenumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: "User", tableName: "users" });

export default User;