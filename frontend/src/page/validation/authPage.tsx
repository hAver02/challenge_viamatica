
import Cookies from "js-cookie"

import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { verify } from "../../api/request"


export function IsAuth() {
    const { isAuth, isLoading, idUser, setIdUser} = useAuth()

    
    if(!isAuth && !isLoading) return <Navigate to={'/login'} replace/>
    return <Outlet />
}





export function IsThereToken () {

    const {isAuth, setIsAuth, setIdUser, setPersona, setUser} = useAuth()
    const navigate = useNavigate()

    async function checkToken (){

        if(isAuth) return <Navigate to={'/'} replace/>

        const cookies = Cookies.get()


        if(cookies?.authToken){
            const res = await verify()

            if (res.data.ok) {
                setIsAuth(true)
                setIdUser(res.data.usuario._id);
                setUser(res.data.usuario.user)
                setPersona(res.data.usuario.persona)
                navigate('/')
            }

        }
    }
    checkToken()
    return <Outlet />
}