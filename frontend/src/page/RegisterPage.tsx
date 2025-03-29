
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


export default function RegisterPage(){
    const { register, handleSubmit, formState: { errors }  } :any = useForm();
    const { signup } = useAuth()
    const validateUsername = (value : string) => {
      const usernameRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      if (!usernameRegex.test(value)) {
        return "El nombre de usuario debe tener entre 8 y 20 caracteres, al menos una letra mayúscula y un número.";
      }
      return true;
    };
  
    const validatePassword = (value: string) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(value)) {
        return "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un signo especial.";
      }
      return true;
    };
  
    const validateId = (value : string) => {
      const idRegex = /^\d{10}$/;
      const hasConsecutiveNumbers = /(\d)\1{3}/.test(value); 
      if (!idRegex.test(value)) {
        return "La identificación debe ser numérica y tener 10 dígitos.";
      } else if (hasConsecutiveNumbers) {
        return "La identificación no puede contener 4 dígitos consecutivos.";
      }
      return true;
    };
  

    const onSubmit = async (data: any) => {
      try {
        
        const rta = await signup(data)
        console.log(rta);
        
        if(!rta) return toast.error("Error en el registro del usuario")
        toast.success("¡Registro exitoso!");
        
      } catch (error) {
        toast.error("Error al registrar.");
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
        <Toaster />
        <h2 className="text-center text-2xl font-bold mb-4">Registro de Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-semibold mb-2">Nombre</label>
            <input
              id="nombre"
              {...register("nombre", { required: "El nombre es requerido" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
          </div>
  
          {/* Apellido */}
          <div className="mb-4">
            <label htmlFor="apellido" className="block text-sm font-semibold mb-2">Apellido</label>
            <input
              id="apellido"
              {...register("apellido", { required: "El apellido es requerido" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
          </div>
  

          <div className="mb-4">
            <label htmlFor="documento" className="block text-sm font-semibold mb-2">Documento</label>
            <input
              id="documento"
              type="number"
              {...register("documento", {
                required: "El documento es requerido",
                validate: validateId,
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.documento && <p className="text-red-500 text-sm">{errors.documento.message}</p>}
          </div>
  

          <div className="mb-4">
            <label htmlFor="fechaNacimiento" className="block text-sm font-semibold mb-2">Fecha de Nacimiento</label>
            <input
              id="fechaNacimiento"
              type="date"
              {...register("fechaNacimiento", { required: "La fecha de nacimiento es requerida" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.fechaNacimiento && <p className="text-red-500 text-sm">{errors.fechaNacimiento.message}</p>}
          </div>
  

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold mb-2">Username</label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "El nombre de usuario es requerido",
                validate: validateUsername,
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "El email es requerido", pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
  

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Contraseña</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es requerida",
                validate: validatePassword,
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <button
            onSubmit={onSubmit}
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    );
  
}