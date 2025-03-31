export default function HomeComponents({usuario, persona, lastSession} : any){
    if(!usuario || !persona || !lastSession) return <div>Cargando..</div>
    return(
    <div className=" w-3/4 h-full flex items-center flex-col gap-2 bg-gradient-to-br from-neutral-500 to-neutral-800 p-3 ">
        <div className="flex items-center justify-center gap-10 px-2 py-3 w-full ">
            <h1 className="text-xl font-bold place-items-start text-blue-500">Bienvenido, {persona.nombre}!</h1>

        </div>
        <div className="text-white w-full ">
            <div className="mt-2 flex flex-col gap-3">
                <p><strong>Intentos fallidos:</strong> {usuario.failedAttempts}</p>
                <p>Info de la ultima session</p>
                <p><strong>Inicio de sesión:</strong> {new Date(lastSession.sessionStart).toLocaleString()}</p>
                <p><strong>Fin de sesión:</strong> {usuario.sessionEnd ? new Date(lastSession.sessionEnd).toLocaleString() : "Sesión aún activa"}</p>
            </div>
        </div>
    </div>
    )
}