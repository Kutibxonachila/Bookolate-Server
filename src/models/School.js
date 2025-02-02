// const { DataTypes, UUIDV4 } = require("sequelize");
// const sequelize = require("../config/database");
// const Admin = require("./admin");

import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.config.js";

const School = sequelize.define(
  "School",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Admin,
        key: "id",
      },
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    borrowed_books_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    overdue_books_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    returned_books_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    not_returned_books_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "schools",
    timestamps: true,
  }
);

// Relations
School.belongsTo(Admin, { foreignKey: "admin_id" });

export default School;
