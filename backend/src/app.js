import express from "express";
import connectDB from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import personaRouter from "./routes/persona.router.js";
import usuarioRouter from "./routes/usuario.router.js";
import authRouter from "./routes/auth.router.js";
import sessionRouter from "./routes/session.router.js";


const app = express();
;
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}));
connectDB();


app.use("/api/v1/personas", personaRouter)
app.use("/api/v1/usuarios", usuarioRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/session", sessionRouter)
app.use(errorMiddleware)



app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}` );
    
})