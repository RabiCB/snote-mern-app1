const express=require("express")
const app=express();
//require("dotenv").config()
const port=process.env.PORT||3000;
const connectdb=require("./config/db")
const bodyParser=require("body-parser")
const cors=require("cors")
const route=require("./route")

app.use(cors());
app.use(bodyParser.json())
app.use("/users",route)
connectdb();
app.listen(port,()=>{
    console.log("connected")
})