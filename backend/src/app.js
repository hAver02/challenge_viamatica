import express from "express";
import connectDB from "./config/db.js";



const app = express();
;
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}));

connectDB();


app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}` );
    
})