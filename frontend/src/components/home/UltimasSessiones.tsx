export default function UltimasSessiones({sessiones} : any){
    if(!sessiones) return <div>Cargando...</div>
    return (
        <div className=" pb-2 flex flex-col bg-gradient-to-br from-neutral-500 to-neutral-800 w-full h-full overflow-y-scroll">
            <h1 className="text-center text-xl text-blue-500 p-2">Tus ultimas sessiones</h1>
            <div className="flex flex-col gap-3">
                {sessiones.map((ses : any) => (
                    <div key={ses._id} className="border border-neutral rounded-md">
                           <p><strong>Inicio de sesión:</strong> {new Date(ses.sessionStart).toLocaleString()}</p>
                           <p><strong>Fin de sesión:</strong> {ses.sessionEnd ? new Date(ses.sessionEnd).toLocaleString() : "Sesión aún activa"}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}