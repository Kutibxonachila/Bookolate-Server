import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

async function app() {
    const app = express()

//
    app.use(bodyParser.json())
    app.use(express.json())
    app.use(morgan('dev'))


    //Handle 404 errors
    app.use((req,res,next)=>{
        res.status(404).json({success:false,message:"Resource not found"})
    })
}

export default app;
