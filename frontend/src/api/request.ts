

import instance from "./axios";

export const verify = () => instance.get("auth/verifyToken");
export const loginReq = (data : any) => instance.post("auth/login", data);
export const registerReq = (user : any) => instance.post("auth/register", user)
