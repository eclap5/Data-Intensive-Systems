import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/postgreDB";

class Review extends Model {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public rating!: number;
    public review!: string;
    public createdAt!: Date;
}

Review.init({
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
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, { sequelize, tableName: "reviews" });

export { Review };