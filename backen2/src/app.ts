import app from "@server/server"
import connectDB from "config/db";
import authRouter from "routes/auth.router";
import intentosRouter from "routes/intentos.router";
import personaRouter from "routes/persona.router";
import sessionRouter from "routes/session.router";
import usuarioRouter from "routes/usuario.router";
import uploadRouter from 'routes/upload.router';
import "dotenv/config"
import { errorMiddleware } from "@middlewares/error.middleware";


connectDB();


app.use("/api/v1/personas", personaRouter)
app.use("/api/v1/usuarios", usuarioRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/session", sessionRouter)
app.use("/api/v1/failed", intentosRouter)
app.use("/api/v1/upload",uploadRouter )

app.use("/", (req, res) => {
    res.json({ ok : false, message : 'Path not found'})
})
app.use(errorMiddleware)

app.listen(process.env.PORT , () => console.log("Running port 8080"))


