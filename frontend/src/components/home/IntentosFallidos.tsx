import { useEffect, useState } from "react"
import { getIntentosByUserId } from "../../api/request";

export default function IntentosFallidos({userId} : any){
    const [intentosFallidos, setIntentosFallidos] = useState<any>([]);
    useEffect(() => {
        const getIF = async () => {
            try {
                const rta = await getIntentosByUserId(userId)
                console.log(rta);
                if(Array.isArray(rta.data.intentosFallidos)){
                    setIntentosFallidos(rta.data.intentosFallidos)
                }
                if(!rta.data.intentosFallidos) return;
                else{
                    const array = []
                    array.push(rta.data.intentosFallidos)
                    setIntentosFallidos(array);
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        if(!userId) return
        getIF()
    }, [])
    return(
        <div className="text-white flex-1 items-center justify-center flex flex-col gap-3 w-full ">
            <h1 className="text-center text-xl text-blue-500 p-2">Intentos fallidos</h1>
            <div className="flex flex-col gap-3">
                {intentosFallidos.map((int : any) => (
                    <div key={int._id} className="border border-neutral rounded-md">
                           <p><strong>Intento de inicio de session:</strong> {new Date(int.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}