import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app : Application = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))



export default app;