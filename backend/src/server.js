import app from "./app.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv"


dotenv.config()


connectDb().then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log(`server running on port ${process.env.PORT}`);
        
    })
}).catch((error)=>{
   console.log("mongo db error" , error);
})