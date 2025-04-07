

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginReq } from '../api/request';


const defaultTheme = createTheme();

export function LoginPage2() {
    const {setIsAuth, setIdUser } = useAuth()
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if(loginError){
            setTimeout(() => {
                setLoginError('')
            }, 3000)
        }
    }, [loginError])

  const handleSubmit =async  (event : any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")
    const password = data.get("password")
    
    try {

        const rta = await loginReq({email, password})
        
            if(rta.data.ok){
                setIsAuth(true)
                setIdUser(rta.data.user_id)
                navigate('/')
            }else{
                setLoginError(rta.data.message.toUpperCase())
            }
    } catch (error) {
        setLoginError('Error al ingresar a la cuenta')
    }
  }
  return (
    <div className='flex items-center justify-center w-full h-full '>

    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }} className='items-center border-2 border-white bg-neutral-600 p-20 rounded-xl'>
        <CssBaseline />
        <Grid >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5" className='text-blue-500'>
              Viamatica
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            <p className='text-red-400  font-lg font-bold text-center'>
              {loginError}
            </p>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container >
                <Grid >
                  <Link href="/recovery-pass" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid >
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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