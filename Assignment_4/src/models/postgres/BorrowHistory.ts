import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/postgreDB";

class BorrowHistory extends Model {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public borrowDate!: Date;
    public returnDate!: Date;
}

BorrowHistory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "books",
            key: "id"
        }
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { sequelize, tableName: "borrow_history" });

export { BorrowHistory };