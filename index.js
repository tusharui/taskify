import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes/index.js"


dotenv.config()
const app = express()
app.use(express.json())

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET", "POST" , "DELETE", "PUT"],
    allowedHeaders:['Content-Type', "Authorization"],
})
);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>   console.log("db connected successufllly ")).catch((err)=> console.log("failed connected to db "))    ;

app.use(morgan("dev"));

const PORT = process.env.PORT || 5000 ;

app.get("/" , async(req, res)=>{
    res.status(200).json({msg:"hello"})
});

app.use("/api-v1", routes);


//error middleware 
app.use((err,req,res, next)=>{
    console.log(err.stack);
    res.status(500).json({message:"Internal server error "});
});

// not found middleware 
app.use((req,res)=>{
    res.status(404).json({
        message: "not found"
    })
})






app.listen(PORT , ()=>{
    console.log(`Server running on port  ${PORT}  `)
})
