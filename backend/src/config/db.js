import mongoose from "mongoose"




const connectDb =  async()=>{
   try {
     const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
     console.log(`mongo db connected ${connectionInstance.connection.host}`);
   } catch (error) {
     console.log("mongo db connection failed" , error);
     
   }
}


export default connectDb