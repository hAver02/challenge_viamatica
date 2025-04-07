import { Request, Response, NextFunction } from "express";
import { personaService } from "../services/persona.service";

class PersonaController {
	constructor(private service = personaService) {}

	getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const personas = await this.service.getAll();
			res.json({ ok: true, personas });
		} catch (error) {
			next(error);
		}
	};

	updatePersona = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const persona = req.body;
		const { id } = req.params;

		try {
			const newPersona = await this.service.update(id, persona);
			res.json({ ok: true, persona: newPersona });
		} catch (error) {
			next(error);
		}
	};

	getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const { id } = req.params;

		try {
			const persona = await this.service.getById(id);
			res.json({ ok: true, persona });
		} catch (error) {
			next(error);
		}
	};
}

export const personaController = new PersonaController();