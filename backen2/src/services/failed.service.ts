// src/services/failed.service.ts
import { Types } from "mongoose";
import { IIntentoFallido } from "../interfaces/intentosFallidos";
import { intentosFallidosDao } from "../dao/collections/intentosfallidos.dao";

class FailedService {
  constructor(
    private dao: {
      create: (body: IIntentoFallido) => Promise<IIntentoFallido>;
      findByUserId: (id: Types.ObjectId) => Promise<IIntentoFallido[]>;
    }
  ) {}

  create = async (body: IIntentoFallido) => {
    try {
      return await this.dao.create(body);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  findByUserId = async (id: Types.ObjectId) => {
    try {
      const result = await this.dao.findByUserId(id);
      if (!result || result.length === 0) {
        throw new Error("Failed attempts not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export const failedService = new FailedService(intentosFallidosDao);
