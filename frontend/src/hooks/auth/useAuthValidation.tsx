import {  useEffect } from "react"
import Cookies from "js-cookie"

import { useAuth } from "../../context/AuthContext"
import { getUserById, verify } from "../../api/request"

export function useAuthValidation (){
    const {idUser, refresh ,setIsAuth, setRefresh ,setIdUser, setUser, setIsLoading, isAuth} = useAuth()
    useEffect(() => {
        async function getUser(){
            try {
                const rta = await getUserById(idUser);
                console.log(rta);
                if(!rta.data.ok) return 
                setUser(rta.data.user);
                if(refresh) setRefresh(false)
                
            } catch (error) {
                console.log(error);
                                
            }
        }
        if(!idUser) return 
        getUser()
    }, [idUser, refresh])   

    useEffect(() => {
        async function checkToken (){
            if(isAuth && idUser) return setIsLoading(false)
            setIsLoading(true)
            const cookies = Cookies.get()

            if(cookies?.token){
                const res = await verify()
                if (res.data.ok) {
                    setIdUser(res.data.id)
                    setIsAuth(true)
                }
            } 
            setIsLoading(false)
        }

        checkToken()

    },[refresh])
    

    return 
}
