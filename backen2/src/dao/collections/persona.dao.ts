import { PersonaModel } from "../../models/persona.model";
import MongoDao from "../MongoDao";
import { IPersona } from "../../interfaces/persona";
import { Model } from "mongoose";

class PersonaDao extends MongoDao<IPersona> {
  constructor(model: Model<IPersona>) {
    super(model);
  }

  findByDocument = async (document: string): Promise<IPersona | null> => {
    return this.model.findOne({ documento: document });
  };
}

export const personaDao = new PersonaDao(PersonaModel);
