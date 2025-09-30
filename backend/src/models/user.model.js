import mongoose, { Schema } from "mongoose";



const userSchema = new Schema ({
    firstName :{
        type :String,
        required :true
    },
    lastName :{
          type :String,
        required :true
    },
    email :{
          type :String,
        required :true
    },
    mobileNumber :{
           type :String,
        required :true
    },
    gender :{
           type :String,
        required :true
    },
    activeStatus :{
           type :String,
            enum: ['active' , 'inactive'],
        required :true
    },
    profile :{
    type :String,
       
    },
     location :{
    type :String,
        required :true
    }
    


} ,{timestamps : true})



export const User = mongoose.model("User" , userSchema)