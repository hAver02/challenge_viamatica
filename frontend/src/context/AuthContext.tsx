// import { createContext, useContext, useEffect, useState } from "react";
// // import { TeacherLogin, Teacher } from "../types";
// import Cookies from "js-cookie";
// import { loginReq, logout, registerReq, verify } from "../api/request";
// import { UserRegister } from "../types/UserRegister";
// import toast from "react-hot-toast";


// export const AuthContext = createContext({})

// export const useAuth = (): any => {
//     const context = useContext(AuthContext)
//     return context
// }


// export function AuthProvider({children} : any){

//     const [user, setUser] = useState([])
//     const [isAuth, setIsAuth] = useState(false)
//     const [loading, setLoading] = useState(true)
    
//     const signup = async (user : UserRegister) =>{
//         const {apellido, documento, email, fechaNacimiento, nombre, password, username} = user;
//         if(!apellido ||  !documento || ! email || !fechaNacimiento || !nombre || !password ||  !username){
//             return false;
//         }
//         const usuario = { password: user.password, username : user.username, email : user.email}
//         const persona = {nombre : user.nombre, apellido : user.apellido, fechaNacimiento : user.fechaNacimiento, documento : user.documento};
//         const rta = await registerReq({usuario, persona})
        
//         if(!rta.data.ok) return false

//         return rta
//     }

//     const signin = async (user:any) => {
//         try {
            
//             const rta = await loginReq(user)
//             if(!rta.data.ok){
//                 toast.error(rta.data.message)
//                 return false;
//             }
//             setUser(rta?.data?.user)
//             setIsAuth(true)
            
 
            
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
    
//     async function logoutSession (){
//         try {

//             const rta = await logout();
//             setIsAuth(false)
//             setUser([])
            
//         } catch (error) {
            
//         }
//     }

//     async function verifyToken(){
//         try {
//             setLoading(true)

//             const {authToken} = Cookies.get()
//             if(!authToken) return setIsAuth(false)
//             const rta = await verify()
            
//             if(rta.data.ok && rta.data.usuario){
//                 setIsAuth(true)
//                 setUser(rta.data.usuario)
//             }else{
//             setIsAuth(false)
//             }

//         } catch (error) {
//             setIsAuth(false)
//             setUser([])
//         }
//         finally{
//             setLoading(false)

//         }


//     }
    
//     useEffect( () => {
//         verifyToken()
//     }, [])

//     return (
//         <AuthContext.Provider value={{user, signin, signup, isAuth, loading, logoutSession}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


import {createContext, useContext, useState} from 'react'
// import {useNavigate} from 'react-router-dom'


export const useAuth = (): any => {
    const context = useContext(AuthContext)
    return context
}
export const AuthContext = createContext({})


export function AuthProvider({children} : any){

    const [idUser, setIdUser ] = useState('')
    const [isLoading, setIsLoading ] = useState(true)
    const [user, setUser] = useState({})

    const [isAuth, setIsAuth] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [persona, setPersona] = useState({})
    return (
        <AuthContext.Provider value={{user, setUser ,setIdUser, 
                                        idUser, isAuth, setIsAuth, isLoading, setIsLoading, refresh, setRefresh, persona, setPersona
                                    }}>
            { children }    
        </AuthContext.Provider>
    )
}


