export default function HomeComponents({usuario, persona, lastSession} : any){
    if(!usuario || !persona || !lastSession) return <div>Cargando..</div>
    return(
    <div className=" w-3/4 m-auto  h-full flex flex-col ">
        <div className="flex items-center justify-center gap-10 px-2 py-3 w-full ">
            <h1 className="text-xl font-bold place-items-start text-blue-500">Su ultima session e información</h1>
        </div>
        <div className="text-white w-full py-5">
            <div className="mt-2 flex gap-3 justify-between px-10">
                <div className=" w-full items-center justify-center">
                    <p>Info de la ultima session</p>
                    <p><strong>Inicio de sesión:</strong> {new Date(lastSession.sessionStart).toLocaleString()}</p>
                    <p><strong>Fin de sesión:</strong> {usuario.sessionEnd ? new Date(lastSession.sessionEnd).toLocaleString() : "Sesión aún activa"}</p>
                </div>
                <div className="w-full flex items-center justify-center">
                    <p><strong>Intentos fallidos:</strong> {usuario.failedAttempts}</p>
                </div>
            </div>
        </div>
    </div>
    )
}