
export type UserToUpdate = {
    idUser : string,
    idPersona :string
    nombre: string;
    apellido: string;
    sessionActive: boolean;
    status: "active" | "blocked";
    failedAttempts: number;
  };
  
  export type UserToUpdateHimself  = {
    id: string;
    idPersona : string
    nombre: string;
    apellido: string;
    documento: string;
    fechaNacimiento: string;
    username: string;
  };