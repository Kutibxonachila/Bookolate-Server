import { DataTypes, NOW, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db.config.js";

const WeeklyPopularBooks = sequelize.define(
  "weekly_popular_books",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize will automatically generate UUIDv4
      primaryKey: true,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.UUID, // Use UUID, not UUIDV4
      allowNull: false,
      references: {
        model: "Book",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time_borrowed: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE(NOW),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default WeeklyPopularBooks;
