import { DataTypes, NOW, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db.config.js";

const WeeklyPopularBooks = sequelize.define(
  "weekly_popular_books",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    book_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
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
