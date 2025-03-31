import { useEffect, useState } from "react";
import {LuLoader} from 'react-icons/lu'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage(){
    const [email, setEmail] = useState('bdj043@dcobe.com');
	const [password, setPassword] = useState('Abc123');
    const navigate = useNavigate()
    
    const {signin, isAuth} = useAuth();
    const isPending = false;
	
	useEffect(() => {
		if(isAuth) navigate("/")
	}, [isAuth])
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const rta = await signin({email,password})
        if(rta == true) return navigate('/')
		
    }
    return(
        <div className='h-full flex flex-col items-center gap-5 bg-gradient-to-bl from-neutral-200 to-neutral-400 p-5 rounded-xl'>
			<h1 className='text-4xl font-bold capitalize'>
				Iniciar sesión
			</h1>

			<p className='text-sm font-medium'>
				Que bueno tenerte de vuelta
			</p>

			{
            isPending 
            ? (
				<div className='w-full h-full flex justify-center mt-20'>
					<LuLoader className='animate-spin' size={60} />
				</div>
			) : (
				<>
					<form
						className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]'
	
					>
						<input
							type='email'
							placeholder='Ingresa tu correo electrónico'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>

						<input
							type='password'
							placeholder='Ingresa tu contraseña'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>

						<button 
                        onClick={handleSubmit}
                        className='bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full'>
							Iniciar sesión
                        
						</button>
					</form>

					<p className='text-sm text-stone-800'>
						¿No tienes una cuenta?
						<Link to='/register' className='underline ml-2'>
							Regístrate
						</Link>
					</p>
				</>
			)}
		</div>
    )
}