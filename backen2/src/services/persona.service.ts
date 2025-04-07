
import { personaDao } from "../dao/collections/persona.dao";
import CustomError from "../utils/custom.error";
import { IPersona } from "../interfaces/persona.js";
import { Types } from "mongoose";

class PersonaService {
  private dao: typeof personaDao;

  constructor(dao: typeof personaDao) {
    this.dao = dao;
  }

  getAll = async (): Promise<IPersona[]> => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(String(error));
    }
  };

  getById = async (id: string): Promise<IPersona> => {
    try {
      const rta = await this.dao.getById(id);
      if (!rta) {
        throw new CustomError("Persona not found", 404);
      }
      return rta;
    } catch (error) {
      throw error;
    }
  };

  create = async (persona: IPersona): Promise<IPersona> => {
    try {
      const rta = await this.dao.create(persona);
      if (!rta) throw new CustomError("Error creating persona", 404);
      return rta;
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, persona: Partial<IPersona>): Promise<IPersona> => {
    try {
      const rta = await this.dao.update(id, persona);
      if (!rta) {
        throw new CustomError("Persona not found", 404);
      }
      return rta;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      const rta = await this.dao.delete(id);
      if (!rta) {
        throw new CustomError("Persona not found", 404);
      }
    } catch (error) {
      throw error;
    }
  };
}

export const personaService = new PersonaService(personaDao);