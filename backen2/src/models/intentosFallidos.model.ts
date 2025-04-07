
import mongoose, { Schema, model } from "mongoose";
import { IIntentoFallido } from "../interfaces/intentosFallidos";

const FailedAttemptsSchema = new Schema<IIntentoFallido>({
  userId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  date: { type: Date, required: true },
});

export const FailedModel = model<IIntentoFallido>("IntentosFallidos", FailedAttemptsSchema);
