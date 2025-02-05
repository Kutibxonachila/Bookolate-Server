import { sequelize } from "../config/db.config.js";
import { DataTypes, UUIDV4 } from "sequelize";


const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin"),
      allowNull: false,
      defaultValue: "admin",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    permissions: {
      type: DataTypes.JSONB,
      defaultValue: {},
      get() {
        if (this.getDataValue("role") === "superadmin") {
          return { all: true };
        }
        return this.getDataValue("permissions");
      },
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "schools", // Use the string name here to break the circular reference
        key: "id",
      },
      validate: {
        isNullIfSuperAdmin(value) {
          if (this.role === "superadmin" && value !== null) {
            throw new Error(
              "Superadmin should not be associated with a school"
            );
          }
        },
      },
    },
  },
  {
    tableName: "admins",
    timestamps: false,
  }
);

export default Admin;
