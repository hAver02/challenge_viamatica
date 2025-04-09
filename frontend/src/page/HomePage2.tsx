import { useNavigate } from "react-router-dom";
import { getSessionsByUserId } from "../api/request";
import { useAuth } from "../context/AuthContext";
import { useAuthValidation } from "../hooks/auth/useAuthValidation";
import { useEffect, useState } from "react";
import NavBar from "../components/home/nav";
import HomeComponents from "../components/home/homeComponent";
import { UserToUpdateHimself } from "../types/UserToUpdate";
import UltimasSessiones from "../components/home/UltimasSessiones";
// import { UpdateInfo } from "../components/home/UpdateInfo";
import IntentosFallidos from "../components/home/IntentosFallidos";
import UpdateUserInfo from "../components/home/UpdateInfo";

export default function HomePage2(){
    useAuthValidation();
    const { persona, user, isAuth } = useAuth()
    const [select, setSelect] = useState("home");
    const [sessiones, setSessiones] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
          const fetchSessions = async () => {
            try {
              if(!isAuth || !user) return;
    
              const response = await getSessionsByUserId(user._id);
              setSessiones(response.data.sessions);
    
            } catch (error) {
              console.error("Error al obtener los datos del usuario", error);
            }
          };
          if(!isAuth) navigate("/login")
          fetchSessions();
    }, [user, isAuth]);

    
        if (!user) {
          return <p className="text-center text-gray-500">Cargando...</p>;
        }
        const lastSession = sessiones.find((session : any) => session.sessionEnd == null)
    
        const userToUpdate : UserToUpdateHimself = {
          id: user._id,
          idPersona : persona._id,
          nombre : persona.nombre,
          apellido : persona.apellido,
          documento : persona.documento,
          fechaNacimiento : persona.fechaNacimiento,
          username : user.username
        }
        
    return(
        <div className="w-full h-full bg-gradient-to-bl from-neutral-200 to-neutral-700 min-h-screen">
            <div className="flex flex-col items-center min-h-screen justify-center ">
                <NavBar setSelect={setSelect} select={select} role={user.role} nombre={persona.nombre}/>


                <div className="w-full h-full flex bg-gradient-to-br from-neutral-500 to-neutral-700 flex-1">
                    {
                        select == "home" ? 
                            <HomeComponents persona={persona} lastSession ={lastSession} usuario={user} />
                          : 
                          select == "ultimas sessiones" ? <UltimasSessiones sessiones={sessiones} /> :
                          select == "update-info" ? <UpdateUserInfo user={userToUpdate} setSelect={setSelect} /> :
                          <div className="w-full h-full bg-neutral-500">
                            <IntentosFallidos userId={user._id}/>
                          </div>
                      } 
               
                      </div>
              </div>
        </div>
    )
}