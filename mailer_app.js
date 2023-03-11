const express=require("express");
const app=express();
app.get("/",(req,res)=>
{
    res.send("server");
});
const sendMail=require("./sendMail");
app.get("/sendmail",sendMail);
const start =async()=>{
    try{
        app.listen(5000,()=>{
            console.log("server started");
        });
    }
    catch(err)
    {
        console.log(err);
    }
}
 
start(); 