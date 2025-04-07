

import instance from "./axios";

export const verify = () => instance.get("auth/verifyToken");
export const loginReq = (data : any) => instance.post("auth/login", data);
export const registerReq = (user : any) => instance.post("auth/register", user)
export const logout = () => instance.post("auth/logout")
//sessiones
export const getSessionsByUserId = (userId : string) => instance.get(`session/${userId}`)


//usuarios

export const updateUsername = (userId : string , username : string) => instance.put(`usuarios/${userId}/username`, {username});
export const getUsuarios = () => instance.get("usuarios");
export const updateUser = (userId : string, user : any) => instance.put(`usuarios/${userId}`, user)
export const getUserById = (userId : string) => instance.get(`usuarios/${userId}`)

//perosnas
export const updatePersona = (personaId : string, persona : any) => instance.put(`personas/${personaId}`, persona)

export const getPersonaById = (id : string ) => instance.get(`personas/${id}`)


export const getIntentosByUserId = (userId : string) => instance.get(`failed/${userId}`)