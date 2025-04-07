import { ModelUsuario } from "../../models/usuario.model";
import MongoDao from "../MongoDao";
import { IUsuario } from "../../interfaces/usuario";

class UsuarioDao extends MongoDao<IUsuario> {
  constructor(model: typeof ModelUsuario) {
    super(model);
  }

  findUserByUsername(username: string) {
    try {
      return this.model.findOne({ username }).populate("idPersona");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  findUserByEmail(email: string) {
    try {
      return this.model.findOne({ email });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  findUserByEmailOrUsername(username: string, email: string) {
    return this.model.findOne({ $or: [{ username }, { email }] });
  }

  updateSession = async (id: string, bool: boolean) => {
    return await this.model.findByIdAndUpdate(id, { sessionActive: bool }, { new: true });
  };

  updateFailed = async (id: string, numb: number) => {
    return await this.model.findByIdAndUpdate(id, { failedAttempts: numb }, { new: true });
  };

  updateStatus = async (id: string, newStatus: "active" | "blocked") => {
    return await this.model.findByIdAndUpdate(id, { status: newStatus }, { new: true });
  };
}

export const usuarioDao = new UsuarioDao(ModelUsuario);