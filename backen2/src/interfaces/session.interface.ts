import { Types } from "mongoose";

export interface ISession {
  userId: Types.ObjectId;
  sessionStart?: Date;
  sessionEnd?: Date | null;
  }
  