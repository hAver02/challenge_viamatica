import { Request, Response, NextFunction } from "express";
import { usuarioService } from "../services/usuario.service.js";
import CustomError from "../utils/custom.error.js";

class UsuarioController {
    private service;
  constructor(service: typeof usuarioService) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personas = await this.service.getAll();
      res.json({ ok: true, usuarios: personas });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await this.service.getById(id);
      res.json({ ok: true, user });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      await this.service.delete(id);
      res.json({ ok: true, message: "User deleted successfully!" });
    } catch (error) {
      next(error);
    }
  };

  updateUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.body;
    const { id } = req.params;

    if (!username) throw new CustomError("Not sent new username", 400);
    try {
      const userUpdated = await this.service.update(id, { username });
      res.json({ ok: true, user: userUpdated });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const data = req.body;

    if (!data || !id) throw new CustomError("Not sent new data or id", 400);

    try {
      const userUpdated = await this.service.update(id, data);
      res.json({ ok: true, user: userUpdated });
    } catch (error) {
      next(error);
    }
  };
}

export const usuarioController = new UsuarioController(usuarioService);
