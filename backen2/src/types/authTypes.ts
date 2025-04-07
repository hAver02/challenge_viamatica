export interface PersonaData {
    nombre: string;
    apellido: string;
    documento: string;
    fechaNacimiento: string;
  }
  
  export interface UsuarioData {
    username: string;
    email?: string;
    password: string;
    role?: "admin" | "user";
  }
  
  export interface LoginData {
    username?: string;
    email?: string;
    password: string;
  }