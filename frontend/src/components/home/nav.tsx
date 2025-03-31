import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavBar({setSelect, select, role } : any){

    const navigate = useNavigate()
    const {logoutSession } = useAuth()
    const handleLogout = async () => {

        const data = await logoutSession();
        return navigate("/login")
    }
    return(
        <>
        <div className="w-1/4 border-gray-200 border-2 h-full">          
            <div className="w-full flex flex-col  h-full py-5 ">
                    <div className="w-full flex items-center justify-center gap-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        onClick={() => handleLogout()}
                        className="hover:text-black hover:bg-neutral-200 size-12 text-blue-300 text-center p-3 rounded-xl border-neutral-200 border-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        <svg
                        onClick={() => setSelect("update-info")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="hover:text-black hover:bg-neutral-200 size-12 text-blue-300 text-center p-3 rounded-xl border-neutral-200 border-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                        {
                            
                           role == "admin" ? 
                           <svg onClick={() => navigate("/dashboard")}
                           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                           className="hover:text-black hover:bg-neutral-200 size-12 text-blue-300 text-center p-3 rounded-xl border-neutral-200 border-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>

                           : null
                        }

                    </div>
                    <nav className=" flex items-center  w-full h-full  border-2">
                        <ul className="flex flex-col gap-4 w-full text-blue-500  text-sm ">
                            <li onClick={() => setSelect("home")} className="hover:bg-blue-300 hover:text-blue-800 hover:text-md border-2 border-blue-300  px-2 rounded-sm py-2 w-full">Home</li>
                            <li onClick={() => setSelect("ultimas sessiones")} className="hover:bg-blue-300 hover:text-blue-800 hover:text-md border-2 border-blue-300  px-2 rounded-sm py-2 w-full"> Ultimas sessiones</li>
                            <li onClick={() => setSelect("intentos fallidos")} className="hover:bg-blue-300 hover:text-blue-800 hover:text-md border-2 border-blue-300  px-2 rounded-sm py-2 w-full">Intentos fallidos</li>
                        </ul>
                    </nav>
            </div>
        </div>
        </>
    )
}