// src/dao/collections/intentosFallidos.dao.ts
import { Model, Types } from "mongoose";
import { IIntentoFallido } from "../../interfaces/intentosFallidos";
import MongoDao from "../MongoDao";
import { FailedModel } from "../../models/intentosFallidos.model";

class IntentosFallidosDao extends MongoDao<IIntentoFallido> {
  constructor(model: Model<IIntentoFallido>) {
    super(model);
  }

  findByUserId = async (id: Types.ObjectId): Promise<IIntentoFallido[]> => {
    return this.model.find({ userId: id });
  }
}

export const intentosFallidosDao = new IntentosFallidosDao(FailedModel);
