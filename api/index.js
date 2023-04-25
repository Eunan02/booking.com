import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
const port = process.env.PORT || 5000;
const app=express()
dotenv.config()

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb")
}catch (error){
    throw error ;
}
} 

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})


app.get("/",(req,res) =>{
    res.send("hello first reqiest")
})

//middleware
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next) => {
    const errorStatus= err.status || 500
    const errorMessage= err.message || "Something went wrong!"
   return res.status(errorStatus).json({
    success:false,
    status: errorStatus,
    message:errorMessage,
    stack:err.stack
   })
})

app.listen(8800,() => {
    connect()
    console.log("connected to backend!!")
})
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
   }