import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    idPersona: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Persona", 
      required: true
    },
    username: { 
      type: String,
       unique: true, 
       required: true 
    },
    password: { 
      type: String, 
      required: true
    },
    email: { 
      type: String, 
      unique: true, 
      required: true 
    },
    sessionActive: { 
      type: Boolean, 
      default: true 
    }, 
    status: { 
      type: String, 
      enum: ["active", "blocked"], 
      default: "active" 
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },
    failedAttempts: { 
      type: Number, 
      default: 0
    }
  });
  
export const ModelUsuario = mongoose.model("Usuario", UsuarioSchema);