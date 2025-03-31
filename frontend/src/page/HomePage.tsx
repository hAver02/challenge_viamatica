import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getSessionsByUserId } from "../api/request";
import NavBar from "../components/home/nav";
import HomeComponents from "../components/home/homeComponent";
import UltimasSessiones from "../components/home/UltimasSessiones";
import IntentosFallidos from "../components/home/IntentosFallidos";
import { UpdateInfo, UserToUpdate } from "../components/home/UpdateInfo";

export default function HomePage(){
    const navigate = useNavigate()
    
    const { user, isAuth } = useAuth();
    if(!isAuth) navigate("/login")
    const { user : usuario , persona} = user;
    const [select, setSelect] = useState("home");
    const [sessiones, setSessiones] = useState([])
   

    useEffect(() => {
      const fetchSessions = async () => {
        try {
          if(!user || !isAuth || !usuario) return;

          const response = await getSessionsByUserId(usuario._id);
          setSessiones(response.data.sessions);
        } catch (error) {
          console.error("Error al obtener los datos del usuario", error);
        }
      };
  
      fetchSessions();
    }, [user]);

    
    if (!usuario) {
      return <p className="text-center text-gray-500">Cargando...</p>;
    }
    const lastSession = sessiones.find((session : any) => session.sessionEnd == null)

    const userToUpdate : UserToUpdate = {
      id: usuario._id,
      idPersona : persona._id,
      nombre : persona.nombre,
      apellido : persona.apellido,
      documento : persona.documento,
      fechaNacimiento : persona.fechaNacimiento,
      username : usuario.username
    }
    
    return (
      <div className="flex items-center gap- w-full h-full ">
          <NavBar setSelect={setSelect} select={select} role={usuario.role} />

          {
            select == "home" ? 
                <HomeComponents persona={persona} lastSession ={lastSession} usuario={usuario} />
              : 
              select == "ultimas sessiones" ? <UltimasSessiones sessiones={sessiones} /> :
              select == "update-info" ? <UpdateInfo user={userToUpdate} setSelect={setSelect} /> :
              <div className="w-full h-full bg-neutral-500">
                <IntentosFallidos userId={usuario._id}/>
              </div>
          }
      </div>
    );
}