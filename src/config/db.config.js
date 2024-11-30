import { Sequelize } from "sequelize";
import logger from "../utils/logger";

export const sequelize = new Sequelize(
  "postgresql://neondb_owner:jN7MdqCFtpT4@ep-dry-math-a2zqcfzs.eu-central-1.aws.neon.tech/neondb?sslmode=require",
  {
    logging: logger.debug.bind(logger),
  }
);
