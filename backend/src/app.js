import express, { urlencoded } from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js"


const app = express()



app.use(cors({
    origin:["https://bnv-task-smoky.vercel.app/users"],
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
// serve uploaded files
app.use("/uploads", express.static("uploads"))



app.use("/api/v1/users" , userRouter)



export default app