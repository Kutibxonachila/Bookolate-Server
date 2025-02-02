import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const AllTimePopular_Book = sequelize.define(
  "all_time_popular_books",
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
    total_borrowed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: "all_time_popular_books" }
);

export default AllTimePopular_Book