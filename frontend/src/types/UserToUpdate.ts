
export type UserToUpdate = {
    idUser : string,
    idPersona :string
    nombre: string;
    apellido: string;
    sessionActive: boolean;
    status: "active" | "blocked";
    failedAttempts: number;
  };