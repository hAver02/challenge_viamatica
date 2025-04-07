
import mongoose, { Schema, model } from "mongoose";
import { IPersona } from "../interfaces/persona";

const PersonaSchema = new Schema<IPersona>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  documento: { type: String, unique: true, required: true },
  fechaNacimiento: { type: Date, required: true },
});

export const PersonaModel = model<IPersona>("Persona", PersonaSchema);