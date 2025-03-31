import { useEffect, useMemo, useState } from "react"
import { getPersonaById, getUsuarios } from "../api/request"
import UpdateUser from "../components/dashboard/UpdateUser"
import { UserToUpdate } from "../types/UserToUpdate"
import UsuariosNav from "../components/dashboard/UsuariosNav"
import InfoUser from "../components/dashboard/InfoUser"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


export default function DashboardPage(){
    const {isAuth, user} = useAuth()
    const [usuarios, setUsuarios] = useState([])
    const [searchUser, setSearchUser] = useState('')
    const [userSelect, setUserSelect] = useState('')
    const [updateUser, setUpdateUser] = useState(false)
    const [personaSelect, setPersonaSelect] = useState(null);
    const [personaToUpdate, setPersonaToUpdate] = useState<UserToUpdate>()
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuth || user.user.role != 'user' )  navigate('/')
        async function getUsers(){
            try {
                const rta = await getUsuarios();             
                if(!rta.data.ok) return toast.error("Error!")
                const users = rta.data.usuarios.filter((user : any) =>user.role == "user");
                setUsuarios(users)
            } catch (error) {
                // 
            }
        }
        getUsers()
    }, [isAuth , user])
    useEffect(() => {
        if(!userSelect) return;
        const getInfo = async () => {
            const user : any = usuarios.find((user : any) => user._id == userSelect);
            const rta = await getPersonaById(user.idPersona);
            if(!rta.data.ok) return toast.error("Problem getting person")
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
        }
        getInfo();
    }, [userSelect])

    const usersToShow = usuarios.filter((us: any) => us.email.toLowerCase().includes(searchUser) || us.username.toLowerCase().includes(searchUser));
 
    return(
        <div className="flex items-center gap-3 w-full h-full rounded-xl py-5 bg-gradient-to-b from-neutral-600 to-neutral-800">
            <UsuariosNav usersToShow={usersToShow} setUpdateUser={setUpdateUser} setUserSelect={setUserSelect} setSearchUser={setSearchUser} />
            <div className="flex w-full h-full ">
                {
                    !userSelect ? <div className="flex items-center"><h1>Seleccione un usuario y vera su informacion aca!</h1></div>  :
                    updateUser == true ? <UpdateUser user={personaToUpdate} setUpdateUser={setUpdateUser}/>
                    : <InfoUser userId={userSelect}/>
                }
           
            </div>
        </div>
    )
}