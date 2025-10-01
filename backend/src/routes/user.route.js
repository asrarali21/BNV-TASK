import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addUser, deleteUser, getUsers, updateUser, viewUser, exportUsers } from "../controllers/user.controller.js";





const userRouter = Router()



userRouter.route("/add").post(upload.single("profile"), addUser)
userRouter.route("/users").get(getUsers)
userRouter.route("/export").get(exportUsers)
userRouter.route("/:id").delete(deleteUser)
userRouter.route("/:id").put(updateUser)
userRouter.route("/:id").get(viewUser)



export default userRouter