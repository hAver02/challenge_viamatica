
import { Types } from "mongoose";

export interface IUsuario {
  _id ?: string
  idPersona: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  sessionActive?: boolean;
  status?: "active" | "blocked";
  role?: "user" | "admin";
  failedAttempts?: number;
}
