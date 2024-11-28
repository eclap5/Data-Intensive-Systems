import { sequelize } from "../../config/postgreDB";
import { DataTypes, Model } from "sequelize";

class User extends Model {
    public id!: number;
    public name!: string;
    public birthDate!: Date;
    public phonenumber!: string;
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
        type: DataTypes.STRING,
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
}, { sequelize, tableName: "users" });

export { User };