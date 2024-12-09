import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const BorrowingActivity = sequelize.define("borrowing_activity", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUIDV4(),
    allowNull: false,
  },
  book_id: {
    type: DataTypes.UUIDV4(),
    allowNull: false,
  },
  borrow_date: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE(),
    allowNull: false,
  }, 
  return_date: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  status: {
    type: DataTypes.VIRTUAL,
    get() {
      if (!return_date) {
        return "Not Returned";
      } else if (return_date <= due_date) {
        return "On Time";
      } else {
        return "Overdue";
      }
    },
  },
});

export default BorrowingActivity;