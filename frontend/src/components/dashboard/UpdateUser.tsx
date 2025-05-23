// import { useState } from "react";
// import { UserToUpdate } from "../../types/UserToUpdate";
// import { updatePersona, updateUser } from "../../api/request";


// interface Types {
//   user : UserToUpdate | undefined,
//   setUpdateUser : (bool : boolean) => void
// }
// export default function UpdateUser({user, setUpdateUser} : Types){
//     if(!user) return;
    
//     const [formData, setFormData] = useState<UserToUpdate>(user);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       const { name, value } = e.target;
  
//       setFormData((prev) => ({
//         ...prev,
//         [name]: name === "failedAttempts" ? Number(value) : value,
//       }));
//     };
  
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
    
//         if(formData.failedAttempts == user.failedAttempts && formData.apellido == user.apellido
//             && formData.status == user.status && formData.nombre == user.nombre
//             && formData.sessionActive == user.sessionActive
//         ) return; // marcar error todos los campos iguales!
//         try {
//             if(formData.nombre != user.nombre || formData.apellido != user.apellido  ){ 
//                 const rta = await updatePersona(user.idPersona, {nombre : formData.nombre, apellido : formData.apellido});
//                 if(!rta.data.ok) return;
//             }
//             const rta2 =  await updateUser(user.idUser, {
//             failedAttempts : formData.failedAttempts,
//               status : formData.status,
//               sessionActive : formData.sessionActive,
//             })  
            
//         } catch (error) {
          
//         }
//     };
  
//     return (
//       <div className="w-full  h-full shadow-lg  overflow-y-auto px-2 ">
//         <h2 className="text-2xl font-bold text-center mb-4 text-blue-500">Actualizar Usuario</h2>
//         <form onSubmit={handleSubmit} className="space-y-2">
//           <div>
//             <label className="block font-medium text-gray-300">Nombre:</label>
//             <input
//               type="text"
//               name="nombre"
//               defaultValue={formData.nombre}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
  
//           <div>
//             <label className="block font-medium text-gray-300">Apellido:</label>
//             <input
//               type="text"
//               name="apellido"
//               defaultValue={formData.apellido}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
  
//           <div>
//             <label className="block font-medium text-gray-300">¿Sesión Activa?</label>
//             <select
//               name="sessionActive"
//               defaultValue={formData.sessionActive ? "true" : "false"}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="true">Sí</option>
//               <option value="false">No</option>
//             </select>
//           </div>
  
//           <div>
//             <label className="block font-medium text-gray-300">Estado:</label>
//             <select
//               name="status"
//               defaultValue={formData.status}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="active">Activo</option>
//               <option value="blocked">Bloqueado</option>
//             </select>
//           </div>
  
//           <div>
//             <label className="block font-medium text-gray-300">Intentos Fallidos:</label>
//             <select
//               name="failedAttempts"
//               defaultValue={formData.failedAttempts}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {[0, 1, 2, 3].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//           </div>
  
//           <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">
//             Actualizar
//           </button>
//           <button type="button" onClick={() => setUpdateUser(false)} className="w-full p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">
//               Cancelar
//           </button>
//         </form>
//       </div>
//     );
// }

import { useEffect, useState } from "react";
import { UserToUpdate } from "../../types/UserToUpdate";
import { updatePersona, updateUser } from "../../api/request";

interface Types {
  user: UserToUpdate | undefined;
  setUpdateUser: (bool: boolean) => void;
}

export default function UpdateUser({ user, setUpdateUser }: Types) {
  if (!user) return null;

  const [formData, setFormData] = useState<UserToUpdate>(user);
  const [isEditing, setIsEditing] = useState(false); 
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "failedAttempts" ? Number(value) : value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.failedAttempts === user.failedAttempts &&
      formData.apellido === user.apellido &&
      formData.status === user.status &&
      formData.nombre === user.nombre &&
      formData.sessionActive === user.sessionActive
    ) {
      setError("No hiciste ningún cambio");
      return;
    }

    try {
      setError("");
      let rta : any;
      if (formData.nombre !== user.nombre || formData.apellido !== user.apellido) {
        rta = await updatePersona(user.idPersona, {
          nombre: formData.nombre,
          apellido: formData.apellido,
        });
       
        
        if (!rta.data.ok) {
          setError("Error al actualizar persona");
          return;
        }
      }

      const rta2 = await updateUser(user.idUser, {
        failedAttempts: formData.failedAttempts,
        status: formData.status,
        sessionActive: formData.sessionActive,
      });
   
      // setFormData()
      setIsEditing(false); 

    } catch (err) {
      
      setError("Hubo un error al actualizar los datos");
      setIsEditing(false)
    }
  };
  useEffect(() => {
    setFormData(user)
  },[user])
  useEffect(() => {
    setTimeout(() => {
      setError('')
    },2000)
  }, [error])
  return (
    <div className="w-full h-full shadow-lg overflow-y-auto px-2">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-500">Detalle del Usuario</h2>



      <form onSubmit={handleSubmit} className="space-y-2">

        <div>
          <label className="block font-medium text-gray-300">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg ${
              isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100 text-gray-500"
            }`}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg ${
              isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100 text-gray-500"
            }`}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-300">¿Sesión Activa?</label>
          <select
            name="sessionActive"
            value={formData.sessionActive ? "true" : "false"}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg ${
              isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100 text-gray-500"
            }`}
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-300">Estado:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg ${
              isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100 text-gray-500"
            }`}
          >
            <option value="active">Activo</option>
            <option value="blocked">Bloqueado</option>
          </select>
        </div>


        <div>
          <label className="block font-medium text-gray-300">Intentos Fallidos:</label>
          <select
            name="failedAttempts"
            value={formData.failedAttempts}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded-lg ${
              isEditing ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-100 text-gray-500"
            }`}
          >
            {[0, 1, 2, 3].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* BOTONES */}
        {isEditing ? (
          <>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(user);
                setIsEditing(false);
              }}
              className="w-full p-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition"
            >
              Cancelar Edición
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full p-3 bg-blue-400 text-white font-bold rounded-lg hover:bg-blue-600 transition"
            >
              Editar Usuario
            </button>
            <button
              type="button"
              onClick={() => setUpdateUser(false)}
              className="w-full p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
            >
              Volver
            </button>
          </>
          
        )}
      </form>
      {error && <p className="text-red-500 text-center font-medium mb-2">{error}</p>}
    </div>
  );
}
