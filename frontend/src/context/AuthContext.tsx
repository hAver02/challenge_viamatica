
import {createContext, useContext, useEffect, useState} from 'react'
import Cookies from "js-cookie";
import { verify } from '../api/request';
import { useNavigate } from 'react-router-dom';
export const useAuth = (): any => {
    const context = useContext(AuthContext)
    return context
}
export const AuthContext = createContext({})


type Role = "user" | "admin";

interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
}


export function AuthProvider({children} : any){
    const navigate = useNavigate();

    const [idUser, setIdUser ] = useState('')
    const [isLoading, setIsLoading ] = useState(true)
    const [user, setUser] = useState<User|null>(null)

    const [isAuth, setIsAuth] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [persona, setPersona] = useState({})
    useEffect(() => {
        const checkAuth = async () => {
          const token = Cookies.get("authToken");
          
          if (token) {  
            try {
                const res = await verify()
                
                if (res.data.ok) {
                    setIsAuth(true)
                    setIdUser(res.data.usuario._id);
                    setUser(res.data.usuario.user)
                    setPersona(res.data.usuario.persona)
                    navigate('/dashboard')
                } 
                else{
                    return;
                }
            } catch (error) {
              console.error("Invalid token:", error);
              Cookies.remove("authToken");
              setUser(null);
              setIsAuth(false);
            }
          }
        };
    
        checkAuth();
      }, []);
    
    return (
        <AuthContext.Provider value={{user, setUser ,setIdUser, 
                                        idUser, isAuth, setIsAuth, isLoading, setIsLoading, refresh, setRefresh, persona, setPersona
                                    }}>
            { children }    
        </AuthContext.Provider>
    )
}


