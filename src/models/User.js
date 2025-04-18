import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize will automatically generate UUIDv4
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Male",
      validate: {
        isIn: [["Male", "Female"]],
      },
    },
    total_borrowed_books: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    on_time_returns: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    overdue_returns: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    token_: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Users",
  }
);

export default User;
