import { useEffect, useMemo, useState } from "react"
import { getPersonaById, getUsuarios } from "../api/request"
import UpdateUser from "../components/Layout/UpdateUser"
import { UserToUpdate } from "../types/UserToUpdate"
import UsuariosNav from "../components/Layout/UsuariosNav"
import InfoUser from "../components/Layout/InfoUser"

export default function DashboardPage(){
    // const { user, isAuth } = useAuth()
    // const navigate = useNavigate()
    // if(!user || !isAuth) return navigate("/")
    // if(user.role ) // seguir aca...

    const [usuarios, setUsuarios] = useState([])
    const [searchUser, setSearchUser] = useState('')
    const [userSelect, setUserSelect] = useState('')
    const [updateUser, setUpdateUser] = useState(false)
    const [personaSelect, setPersonaSelect] = useState(null);
    const [personaToUpdate, setPersonaToUpdate] = useState<UserToUpdate>()
    useEffect(() => {
        async function getUsers(){
            try {
                const rta = await getUsuarios();
                            
                if(!rta.data.ok) return //marcar mensaje
                const users = rta.data.usuarios.filter((user : any) =>user.role == "user");
     
                
                setUsuarios(users)
            } catch (error) {
                // 
            }
        }
        getUsers()
    }, [])

    const dataPersona = useMemo(async () => {
        if(!userSelect) return;
        const user : any = usuarios.find((user : any) => user._id == userSelect);
        const rta = await getPersonaById(user.idPersona);
        if(!rta.data.ok) return // toaster
        setPersonaSelect(rta.data.persona)
        setPersonaToUpdate({
            idUser : user._id,
            idPersona : user.idPersona,
            nombre : rta.data.persona.nombre,
            apellido : rta.data.persona.apellido,
            sessionActive : user.sessionActive,
            status : user.status,
            failedAttempts : user.failedAttempts
        })
    }, [userSelect])

    const usersToShow = usuarios.filter((us: any) => us.email.toLowerCase().includes(searchUser) || us.username.toLowerCase().includes(searchUser));
 
    return(
        <div className="flex items-center gap-3 w-full h-full rounded-xl py-5 bg-gradient-to-b from-neutral-600 to-neutral-800">
            <UsuariosNav usersToShow={usersToShow} setUpdateUser={setUpdateUser} setUserSelect={setUserSelect} setSearchUser={setSearchUser} />
            <div className="flex w-full h-full ">
                {
                    !userSelect ? <div className="flex items-center"><h1>Seleccione un usuario y vera su informacion aca!</h1></div>  :
                    updateUser == true ? <UpdateUser user={personaToUpdate} />
                    : <InfoUser />
                }
           
            </div>
        </div>
    )
}