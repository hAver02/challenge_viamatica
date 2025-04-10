

import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Alert, Stack } from "@mui/material";
import { updatePersona, updateUsername } from "../../api/request";

export default function UpdateUserInfo({ user } : any) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    fechaNacimiento: "",
    username: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  useEffect(() => {
    if (message.text) {
      const timeout = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 2000); // 2 segundos
  
      return () => clearTimeout(timeout); // limpia si se desmonta o cambia
    }
  }, [message]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { nombre, apellido, documento, fechaNacimiento, username } = formData;

    if (!nombre || !apellido || !documento || !fechaNacimiento || !username)
      return "Todos los campos son obligatorios";

    if (!/^\d{10}$/.test(documento)) return "El documento debe tener 10 dígitos";
    if (/(.)\1{3,}/.test(documento)) return "No puede tener un dígito repetido 4 veces seguidas";

    if (!/^[A-Za-z0-9]{8,20}$/.test(username)) return "Username debe tener entre 8 y 20 caracteres, sin signos";
    if (!/[A-Z]/.test(username)) return "Username debe tener al menos una letra mayúscula";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.username == user.username && formData.apellido == user.apellido
            && formData.fechaNacimiento == user.fechaNacimiento && formData.nombre == user.nombre
            && formData.documento == user.documento
    ) return setMessage({text : "Todos los campos son iguales", type : "error"})
    const error = validate();
    if (error) {
      setMessage({ text: error, type: "error" });
      return;
    }
    
    try {
      if(formData.username != user.username ){
          await updateUsername(user.id, formData.username) 
      }
      const rta =  await updatePersona(user.idPersona, {
          nombre : formData.nombre,
          apellido : formData.apellido,
          fechaNacimiento : formData.fechaNacimiento,
          documento : formData.documento
      })
      if(rta.data.ok) { 
        setFormData(rta.data.persona);
      }
      
      setMessage({ text: "Información actualizada con éxito", type: "success" });
      setIsEditing(false);
    } catch (err) {
      setMessage({ text: "Hubo un error al actualizar", type: "error" });
    }
  };

  return (
    <div className="flex bg-neutral-500 w-full  h-full  items-center justify-center py-10 m-auto mx-20 rounded-xl shadow-sm shadow-neutral-500">

    <Box component="form" onSubmit={handleSubmit} width={1/2} >
      <Typography color="primary" variant="h5" fontWeight={600} textAlign="center" gutterBottom>
        Mi Información
      </Typography>

      <Stack spacing={2}>

        <TextField label="Nombre" name="nombre" defaultValue={formData.nombre} onChange={handleChange} disabled={!isEditing} fullWidth />
        <TextField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} disabled={!isEditing} fullWidth />
        <TextField label="Documento" name="documento" value={formData.documento} onChange={handleChange} disabled={!isEditing} fullWidth />
        <TextField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento.split("T")[0]} onChange={handleChange} disabled={!isEditing}  fullWidth />
        <TextField label="Username" name="username" value={formData.username} onChange={handleChange} disabled={!isEditing} fullWidth />

        {message.text && (
          <Alert severity={message.type === "success" ? "success" : "error"}>
            {message.text}
          </Alert>
        )}

        {!isEditing ? (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} fullWidth>
            Actualizar
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Guardar Cambios
            </Button>
            <Button variant="outlined" color="warning" onClick={() => {
                setFormData(user);
                setIsEditing(false);
                setMessage({ text: "", type: "" });
              }}
              fullWidth
              >
              Cancelar
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
    </div>
  );
}

