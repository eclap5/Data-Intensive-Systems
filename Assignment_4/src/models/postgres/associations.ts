import { User } from "./User";
import { Review } from "./Review";
import { Book } from "./Book";
import { BorrowHistory } from "./BorrowHistory";
import { Author } from "./Author";

// Define associations
User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

Book.hasMany(Review, { foreignKey: "bookId", onDelete: "CASCADE" });
Review.belongsTo(Book, { foreignKey: "bookId", onDelete: "CASCADE" });

User.hasMany(BorrowHistory, { foreignKey: "userId", onDelete: "CASCADE" });
BorrowHistory.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

Author.hasMany(Book, { foreignKey: "authorId", onDelete: "CASCADE" });
Book.belongsTo(Author, { foreignKey: "authorId", onDelete: "CASCADE" });

Book.hasMany(BorrowHistory, { foreignKey: "bookId", onDelete: "CASCADE" });
BorrowHistory.belongsTo(Book, { foreignKey: "bookId", onDelete: "CASCADE" });

export { User, Review, Book, BorrowHistory, Author };
