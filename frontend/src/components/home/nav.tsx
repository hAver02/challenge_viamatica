import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../api/request";

export default function NavBar({setSelect, select, role, nombre } : any){

    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

  
    
    const handleUpdate = () => {
      // tu lógica para actualizar info
      setSelect("update-info")
      setMenuOpen(false)
    };
    const handleLogout = async () => {
        const data = await logout();
        setMenuOpen(false)
        return navigate("/login")
    }
    const {pathname} = useLocation()

    
    return (
        <div className="py-7 bg-neutral-300 w-full justify-around items-center gap-5 flex shadow-md shadow-neutral-700 relative">
          <h1 className="text-3xl text-blue-500">Bienvenido {nombre}</h1>
            <div className="flex justify-evenly w-1/2 items-center relative">
          {
            pathname != "/dashboard" && 
            <ul className="flex gap-5">
              <li onClick={() => setSelect("home")} className="cursor-pointer">Home</li>
              <li onClick={() => setSelect("ultimas sessiones")} className="cursor-pointer">Últimas sesiones</li>
              <li onClick={() => setSelect("intentos-fallidos")} className="cursor-pointer">Intentos fallidos</li>
            </ul>
          }

            <div className="relative">
              <svg
                onClick={() => setMenuOpen(!menuOpen)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10 text-blue-500 cursor-pointer"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
    
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-4 z-50 flex flex-col gap-2">
                  {pathname == "/" && 
                  <button
                    onClick={handleUpdate}
                    className="text-left px-4 py-2 hover:bg-blue-100 rounded"
                  >
                    Actualizar tu información
                  </button>
                  }
                  {role == "admin" && <button className="text-left px-4 py-2 hover:bg-blue-100 rounded" onClick={() => navigate("/dashboard")}>Ir a admin page</button>}
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 hover:bg-red-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    
}