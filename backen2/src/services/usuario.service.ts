import { usuarioDao } from "../dao/collections/usuario.dao";
import CustomError from "../utils/custom.error";
import { IUsuario } from "../interfaces/usuario";
import { Types } from "mongoose";

class UsuarioService {
  private dao = usuarioDao;

  updateSessionStatus = async (id: string, bool: boolean): Promise<IUsuario | null> => {
    try {
      return await this.dao.updateSession(id, bool);
    } catch (error) {
      throw error;
    }
  };

  findUserByUsernameOrEmail = async (
    username: string,
    email: string
  ): Promise<IUsuario | null> => {
    try {
      const user = await this.dao.findUserByEmailOrUsername(username, email);
      return user;
    } catch (error) {
      throw error;
    }
  };

  updateFailedAttemps = async (id: string, number: number): Promise<IUsuario | null> => {
    try {
      if (number < 0 || number > 3)
        throw new CustomError("Error updating failed attempts", 400);
      return this.dao.updateFailed(id, number);
    } catch (error) {
      throw error;
    }
  };

  updateStatus = async (id: string, newStatus: any): Promise<IUsuario | null> => {
    try {
      return await this.dao.updateStatus(id, newStatus);
    } catch (error) {
      throw error;
    }
  };

  getAll = async (): Promise<IUsuario[]> => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw error;
    }
  };

  getById = async (id: string): Promise<IUsuario> => {
    try {
      const rta = await this.dao.getById(id);
      if (!rta) {
        throw new CustomError("Usuario not found", 404);
      }
      return rta;
    } catch (error) {
      throw error;
    }
  };

  create = async (usuario: any): Promise<IUsuario> => {
    try {
      const rta = await this.dao.create(usuario);
      if (!rta) throw new CustomError("Error creating user", 500);
      return rta;
    } catch (error) {
      throw error;
    }
  };

  update = async (id: string, usuario: Partial<IUsuario>): Promise<IUsuario | null> => {
    try {
      const rta = await this.dao.update(id, usuario);
      if (!rta) {
        throw new CustomError("Usuario not found", 404);
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
        throw new CustomError("Usuario not found", 404);
      }
    } catch (error) {
      throw error;
    }
  };
}

export const usuarioService = new UsuarioService();