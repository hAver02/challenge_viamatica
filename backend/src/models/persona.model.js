import mongoose from 'mongoose'

const PersonaSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  apellido: { 
    type: String, 
    required: true 
  },
  documento: { 
    type: String, 
    unique: true, 
    required: true 
  },
  fechaNacimiento: { 
    type: Date, 
    required: true 
  },
});


export const PersonaModel = mongoose.model("Persona", PersonaSchema);
