import express from "express";
let router=express.Router();
let initWebRoutes=(app)=>{
    router.get('/',(req,res)=>{//Request Và Response
        return res.send('Hello Hòa Nha')
    });
        return app.use("/",router);
}
module.exports=initWebRoutes;