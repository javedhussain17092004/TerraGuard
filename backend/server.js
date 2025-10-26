const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const authRoute=require("./routes/routes.js");
const { default: mongoose } = require("mongoose");
const runDisasterJob=require("./cron/disasterJob.js");

const app=express();
const port=process.env.PORT || 8080;
dotenv.config();

const option={
    origin:"*",
    methods:["GET","POST"],
    Credential:true
}

app.use(express.json());
app.use(cors(option));
app.use(authRoute);

app.get("/",(req,res)=>{
    console.log("helo world");
})

app.listen(port,()=>{
    console.log("app is listening at port 8080");
    const connect=async()=>{
        await mongoose.connect(process.env.MONGODB_URL).then((res)=>{
            console.log("database in connected");
        }).catch((e)=>{
            console.log("error in databse connection");
        })
    }
    connect();
    runDisasterJob();
})