import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.config.js";

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      defaultValue: "pending",
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Admin,
        key: "id",
      },
    },
  },
  {
    tableName: "todos",
    timestamps: true,
  }
);

export default Todo;
