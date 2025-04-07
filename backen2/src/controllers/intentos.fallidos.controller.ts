import { Request, Response, NextFunction } from "express";
import { IIntentoFallido } from "../interfaces/intentosFallidos";

import { failedService } from "../services/failed.service";
import { Types } from "mongoose";

class IntentosController {
    private service: typeof failedService;

    constructor(service: typeof failedService) {
        this.service = service;
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const body: IIntentoFallido = req.body;
        try {
            const failed = await this.service.create(body);
            res.json({ ok: true, intentoFallido: failed });
        } catch (error) {
            next(error);
        }
    };

    findByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { userId } = req.params;
    
        try {
            const objectId = new Types.ObjectId(userId); 
            const intentosFallidos = await this.service.findByUserId(objectId);
            res.json({ ok: true, intentosFallidos });
        } catch (error) {
            next(error);
        }
    };
}

export const intentosController = new IntentosController(failedService);
