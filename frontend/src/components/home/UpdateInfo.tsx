import { useState } from "react";
import { updatePersona, updateUsername } from "../../api/request";

export type UserToUpdate  = {
    id: string;
    idPersona : string
    nombre: string;
    apellido: string;
    documento: string;
    fechaNacimiento: string;
    username: string;
  };
interface Types {
    user : UserToUpdate,
    setSelect : any
}
export function UpdateInfo({user, setSelect} : Types){
  
    const [formData, setFormData] = useState({
        nombre: user?.nombre || "",
        apellido: user?.apellido || "",
        documento: user?.documento || "",
        fechaNacimiento: user?.fechaNacimiento || "",
        username: user?.username || "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async  (e : React.FormEvent) => {
        e.preventDefault();
        if(formData.username == user.username && formData.apellido == user.apellido
            && formData.fechaNacimiento == user.fechaNacimiento && formData.nombre == user.nombre
            && formData.documento == user.documento
        ) return; // marcar error todos los campos iguales!
        try {
            if(formData.username != user.username ){
                await updateUsername(user.id, formData.username)
                //notificar  al usuario
            }
            // update persona
           const rta =  await updatePersona(user.idPersona, {
              nombre : formData.nombre,
              apellido : formData.apellido,
              fechaNacimiento : formData.fechaNacimiento,
              documento : formData.documento
            })
            console.log(rta);
            
        } catch (error) {
            // notificar!
        }


        

      };

      console.log(formData);
      
    
      return (
        <div className="w-3/4 h-full p-6 bg-gradient-to-b to-neutral-500 from-neutral-700 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Actualizar Información</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              defaultValue={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="documento"
              placeholder="Documento"
              value={formData.documento}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento.split("T")[0]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
            <button onClick={() => setSelect("home")} 
            className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-800">
              Cancelar
            </button>
          </form>
        </div>
      );
}