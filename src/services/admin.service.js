import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  {JWT_SECRET_KEY} from "../config/env.config.js"


export const createAdmin = async 