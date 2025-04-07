
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerReq } from '../api/request';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
const defaultTheme = createTheme();

export function RegisterPage2() {

    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const { setIdUser, setIsAuth } = useAuth()
    useEffect(() => {
      if (registerError) {
        const timeout = setTimeout(() => setRegisterError(''), 3000);
        return () => clearTimeout(timeout);
      }
    }, [registerError]);
  
    const validateUsername = (username: string) => {
      const hasNoSymbols = /^[A-Za-z0-9]+$/.test(username);
      const hasUppercase = /[A-Z]/.test(username);
      const validLength = username.length >= 8 && username.length <= 20;
      return hasNoSymbols && hasUppercase && validLength;
    };
  
    const validatePassword = (password: string) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasSymbol = /[^A-Za-z0-9]/.test(password);
      const noSpaces = !/\s/.test(password);
      const minLength = password.length >= 8;
      return hasUppercase && hasSymbol && noSpaces && minLength;
    };
  
    const validateDocumento = (doc: string) => {
      const onlyNumbers = /^\d{10}$/.test(doc);
      const noRepeat = !/(.)\1{3}/.test(doc);
      return onlyNumbers && noRepeat;
    };
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const datos = {
        nombre: data.get("nombre")?.toString() || "",
        apellido: data.get("apellido")?.toString() || "",
        documento: data.get("documento")?.toString() || "",
        username: data.get("username")?.toString() || "",
        password: data.get("password")?.toString() || "",
        fechaNacimiento : data.get("fechaNacimiento")
      };
  
      if (!datos.nombre || !datos.apellido || !datos.documento || !datos.username || !datos.password) {
        return setRegisterError("Todos los campos son obligatorios");
      }
  
      if (!validateUsername(datos.username)) {
        return setRegisterError("Username inválido (debe tener mayúscula, sin signos y entre 8-20 caracteres)");
      }
  
      if (!validatePassword(datos.password)) {
        return setRegisterError("Password inválido (mínimo 8, mayúscula, símbolo y sin espacios)");
      }
  
      if (!validateDocumento(datos.documento)) {
        return setRegisterError("Documento inválido (10 dígitos, solo números, sin 4 dígitos repetidos)");
      }

      const personaInfo = {nombre : datos.nombre, apellido : datos.apellido, documento : datos.documento, fechaNacimiento : datos.fechaNacimiento}
      const userInfo = {password : datos.password, username : datos.username}
        try {
            const rta = await registerReq({persona: personaInfo, usuario: userInfo});

            if(rta.data.ok) {
                setIdUser(rta.data.user_id)
                setIsAuth(true)
                toast.success("Tu nuevo email es: "+ rta.data.user_email)
                navigate("/")
            }else{
                setRegisterError(rta.data.message)
            }
        } catch (error) {
            return setRegisterError("Error created user!")
        }
    };


    return (
        <div className="flex items-center justify-center w-full h-full">
          <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }} className='items-center border-2 border-white bg-neutral-600 rounded-xl '>
              <CssBaseline />
              <Grid >
                <Box sx={{ mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                  <Typography component="h1" variant="h5">Sign Up</Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} >
    
                    <TextField margin="normal" required fullWidth name="nombre" label="Nombre" />
                    <TextField margin="normal" required fullWidth name="apellido" label="Apellido" />
                    <TextField margin="normal" required fullWidth name="documento" label="Documento (10 dígitos)" />
                    <TextField type="date" margin='normal' required fullWidth name="fechaNacimiento" label="Fecha de nacimiento" />
                    <TextField margin="normal" required fullWidth name="username" label="Username" />
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" />
    
                    {registerError && <p className="text-center text-red-500 font-bold mt-2">{registerError}</p>}
    
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Registrarse
                    </Button>
    
                    <Grid container justifyContent="center">
                      <Grid >
                        <Link href="/login" variant="body2">
                          ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
      );

}
