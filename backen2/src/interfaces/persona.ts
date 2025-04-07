
import { Types } from "mongoose";

export interface IPersona {
  _id?: Types.ObjectId;
  nombre: string;
  apellido: string;
  documento: string;
  fechaNacimiento: Date;
}
