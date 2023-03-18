import express from "express"
let configViewEngine =(app)=>{
    //arrow fuction
    app.use(express.static("./src/public"));//yêu cầu nó chỉ lấy hình trong public
    app.set("view engine","ejs");//bằng với jsp, blade giúp gõ đc logic trong HTML
    app.set("views","./src/views")
}
module.exports=configViewEngine;