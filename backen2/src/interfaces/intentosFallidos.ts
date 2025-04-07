
import { Types } from "mongoose";

export interface IIntentoFallido {
  userId: Types.ObjectId;
  date: Date;
}
