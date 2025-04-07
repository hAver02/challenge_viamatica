import { NextFunction, Request, Response } from "express";
import { sessionService } from "../services/sessionService";


class SessionController {
    private service: any;
  
    constructor(service: any) {
      this.service = service;
    }
  
    getAll = async (req: Request, res: Response) => {
      try {
        const sessiones = await this.service.getAll();
        res.json({ ok: true, sessiones });
      } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal server error" });
      }
    };
  
    getByUserId = async (req: Request, res: Response, next: NextFunction) => {
      const { userId } = req.params;
  
      try {
        const sessions = await this.service.getByUserId(userId);
        res.json({ ok: true, sessions });
      } catch (error) {
        next(error);
      }
    };
  }

export const sessionController = new SessionController(sessionService);