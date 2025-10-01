import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addUser = asyncHandler(async(req , res) =>{
    const {firstName , lastName ,email , mobileNumber ,gender , activeStatus , location} =req.body


    const localFilePath = req.file.path

    if (!localFilePath) {
        throw new apiError(401 , "File path doesn't exist")

    }
    

    const user = await User.create({
        firstName,
         lastName,
         email,
          mobileNumber,
          gender, 
          activeStatus, 
          location,
          profile : localFilePath
    })

    res.status(200)
    .json(new apiResponse(200 , user , "Successfully User Added"))

})



const getUsers = asyncHandler(async(req , res)=>{
        let {page , limit} = req.query

        page = Number(page) || 1 
         limit = Number(limit) || 10;

           const skip = (page - 1) * limit; 


        const users = await User.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });


         const total = await User.countDocuments(); // total users in DB
        const totalPages = Math.ceil(total / limit);

        
        const userResponse = {
             page,
            totalPages,
            limit,
            total,
            users
        }

        res.status(200)
        .json(new apiResponse(200 , userResponse , "Succesfully got Users"))
})


const deleteUser = asyncHandler(async(req ,res)=>{
    const {id} = req.params

    const user = await User.findById(id)
 if (!user) {
        throw new apiError(404, "User not found");
    }

    await user.deleteOne()


    res.status(200)
        .json(new apiResponse(200, null, "User deleted successfully"));

})


const updateUser = asyncHandler(async(req , res)=>{
    const {id}=req.params 
    const updateData = req.body

    const user = await User.findByIdAndUpdate(id , updateData ,{ new: true, runValidators: true } )

      if (!user) {
        throw new apiError(404, "User not found");
    }
    

    res.status(200)
    .json(new apiResponse(200, user, "User updated successfully"))
})

const viewUser = asyncHandler(async(req , res)=>{
      const {id} = req.params

      const user = await User.findById(id)

          if (!user) {
        throw new apiError(404, "User not found");
    }


      res.json(new apiResponse(200 , user , "Successfully got user"))
})



 const exportUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })
  const headers = ['ID','FullName','Email','Gender','Status','Location','Mobile']
  const rows = users.map(u => [
    u._id,
    `${u.firstName||''} ${u.lastName||''}`.trim(),
    u.email||'',
    u.gender||'',
    u.activeStatus||'',
    u.location||'',
    u.mobileNumber||''
  ])
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="users.csv"')
  res.send(csv)
})

export {addUser , getUsers ,deleteUser , updateUser , viewUser, exportUsers}