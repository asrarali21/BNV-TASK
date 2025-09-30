import express, { urlencoded } from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js"


const app = express()



app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))



app.use("/api/v1/users" , userRouter)



export default app