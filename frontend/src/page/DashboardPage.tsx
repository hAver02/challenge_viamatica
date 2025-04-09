import { useEffect, useState } from "react"
import { getPersonaById, getUsuarios, uploadCSV } from "../api/request"
import UpdateUser from "../components/dashboard/UpdateUser"
import { UserToUpdate } from "../types/UserToUpdate"
import UsuariosNav from "../components/dashboard/UsuariosNav"
import InfoUser from "../components/dashboard/InfoUser"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import NavBar from "../components/home/nav"


export default function DashboardPage(){
    const {isAuth, user} = useAuth()
    const [usuarios, setUsuarios] = useState([])
    const [searchUser, setSearchUser] = useState('')
    const [userSelect, setUserSelect] = useState('')
    const [updateUser, setUpdateUser] = useState(false)
    const [personaSelect, setPersonaSelect] = useState(null);
    const [personaToUpdate, setPersonaToUpdate] = useState<UserToUpdate>()
    const [cargaMasiva, setCargaMasiva] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuth || user.role != 'admin' )  navigate('/')
        async function getUsers(){
            try {
                const rta = await getUsuarios();  
                console.log(rta);
                           
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
        // console.log("aca");
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);

      try {
        const rta = await uploadCSV(file);
        console.log(rta);
        
      } catch (error) {
        toast.error("Error cargando informacion")
      }

    };
    
    return (
        <div className="flex flex-col w-full min-h-screen">
          <NavBar />
          <div className="flex flex-1 w-full h-[calc(100vh-80px)] bg-neutral-700 ">
            <div className="flex">

            <UsuariosNav
              usersToShow={usersToShow}
              setUpdateUser={setUpdateUser}
              setUserSelect={setUserSelect}
              setSearchUser={setSearchUser}
              />
            </div>
            {
              !userSelect
                ? <div className="flex items-center justify-center flex-1 text-white text-xl flex-col gap-10">
                    Seleccione un usuario y verá su información acá!
                    { cargaMasiva ? 
                        <div className="p-4 flex flex-col gap-3" >
                          <input type="file" accept=".csv" onChange={handleFileChange}  className="cursor-pointer" />
                          <button className="border-2 px-1 py-2 rounded-xl text-blue-500 hover:bg-blue-600 hover:text-black cursor-pointer" onClick={handleUpload}>Subir CSV</button>
                        </div>
                        :
                      <div>
                        <button onClick={() => setCargaMasiva(true)} className="border-2 px-1 py-2 rounded-xl text-blue-500 hover:bg-blue-600 hover:text-black cursor-pointer">Carga masiva</button>
                      </div>
                    }
                  </div>
                : updateUser === true
                ? <UpdateUser user={personaToUpdate} setUpdateUser={setUpdateUser} />
                : <InfoUser userId={userSelect} />
            }
          </div>
        </div>
      )
}