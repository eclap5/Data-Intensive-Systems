import { User } from "./User";
import { Review } from "./Review";
import { Book } from "./Book";
import { BorrowHistory } from "./BorrowHistory";
import { Author } from "./Author";

// Define associations
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Review, { foreignKey: "bookId" });
Review.belongsTo(Book, { foreignKey: "bookId" });

User.hasMany(BorrowHistory, { foreignKey: "userId" });
BorrowHistory.belongsTo(User, { foreignKey: "userId" });

Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: "authorId" });

Book.hasMany(BorrowHistory, { foreignKey: "bookId" });
BorrowHistory.belongsTo(Book, { foreignKey: "bookId" });

export { User, Review, Book, BorrowHistory, Author };
