import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const AllTimePopular_Book = sequelize.define(
  "all_time_popular_books",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    book_id: {
      type: DataTypes.UUIDV4(),
      allowNull: false,
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
  { timestamps: false }
);

export default AllTimePopular_Book