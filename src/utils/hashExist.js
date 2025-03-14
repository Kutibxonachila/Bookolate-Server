import bcrypt from "bcrypt";
import { Admin } from "../models/index.js"; // Adjust path as needed

const hashExistingPasswords = async () => {
  const admins = await Admin.findAll();

  for (let admin of admins) {
    if (!admin.password.startsWith("$2b$")) {
      // Check if already hashed
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
      await admin.save();
      console.log(`✔ Hashed password for admin: ${admin.phone}`);
    }
  }
  console.log("✅ All admin passwords updated!");
};

hashExistingPasswords();
