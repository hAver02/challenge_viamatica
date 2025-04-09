import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import csv from 'csv-parser';
import { PersonaModel } from '../models/persona.model';
import { ModelUsuario } from '../models/usuario.model';

export const uploadCSV = async (req: Request, res: Response, _next: NextFunction) => {
  const results: any[] = [];

  const file = req.file;
  if (!file) {
    res.status(400).json({ error: 'No se subió ningún archivo' });
  }
  else{

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        for (const row of results) {
          const existingPersona = await PersonaModel.findOne({ documento: row.documento });
          const existingUsuario = await ModelUsuario.findOne({
            $or: [{ username: row.username }, { email: row.email }]
          });

          if (existingPersona || existingUsuario) {
            console.log("Este usuario ya existe en nuestra bbdd!");
            
            continue;
          }

          const persona = await PersonaModel.create({
            nombre: row.nombre,
            apellido: row.apellido,
            documento: row.documento,
            fechaNacimiento: new Date(row.fechaNacimiento),
          });

          await ModelUsuario.create({
            idPersona: persona._id,
            username: row.username,
            password: row.password,
            email: row.email,
          });
        }
    
        fs.unlinkSync(file.path);
        res.json({ ok : true, message: 'Upload completed succesfully!' })
        
      } catch (err: any) {
        res.status(500).json({ ok :false, error: err.message });
      }
    });
}}