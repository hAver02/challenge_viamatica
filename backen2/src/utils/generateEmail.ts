import { usuarioDao } from "@dao/collections/usuario.dao";



export const generateEmail = async (nombre : string,apellido : string,documento : string) => {
    let cont = 0;
    let email = nombre + apellido[0];
    let isUsed = true;
    while(isUsed){
        try {
            let user = await usuarioDao.findUserByEmail(email+"@mail.com")
            if(user){
                email = email+documento[cont]
                cont++;
            }else{
                isUsed = false
            }
        } catch (error) {
            console.log(error);
            return;
            
        }
    }
    
    return email+"@mail.com";

}