import { useEffect, useState } from "react"
import { getIntentosByUserId, getSessionsByUserId } from "../../api/request";
import toast from "react-hot-toast";

export default function InfoUser({userId} : {userId : string}){

    
    const [sessions, setSessions] = useState([])
    const [failed, setFailed] = useState<any>([])
    useEffect(() => {
 
        
        if(!userId) return
        const getData = async () => {
            const rta = await getSessionsByUserId(userId);

            
            if(!rta.data.ok) return toast.error("Problem getting sessions");
            setSessions(rta.data.sessions);
            
            const rta2 = await getIntentosByUserId(userId);
            if(!rta2.data.ok) toast.error("problem getting attempts");

            setFailed(rta2.data.intentosFallidos)

        }
        getData()
    }, [userId])
    return (
        <div className="w-full flex flex-col gap-3 overflow-y-auto">
            <h1 className="text-xl text-blue-500 font-semibold text-center">Informacion del usuario</h1>
            <div className="w-full flex-col gap-1">
                <h2 className="text-xl text-blue-500 font-semibold text-center">Sessiones</h2>
                <div className="flex flex-col gap-3">
                {sessions.map((ses : any) => (
                    <div key={ses._id} className="border border-neutral rounded-md">
                           <p><strong>Inicio de sesión:</strong> {new Date(ses.sessionStart).toLocaleString()}</p>
                           <p><strong>Fin de sesión:</strong> {ses.sessionEnd ? new Date(ses.sessionEnd).toLocaleString() : "Sesión aún activa"}</p>
                    </div>
                ))}
            </div>
            </div>
            <div>
                <h2 className="text-xl text-blue-500 font-semibold text-center">Intentos fallidos</h2>
                <div className="flex flex-col gap-1">
                {failed.map((int : any) => (
                    <div key={int._id} className="border border-neutral rounded-md">
                           <p><strong>Intento de inicio de session:</strong> {new Date(int.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}