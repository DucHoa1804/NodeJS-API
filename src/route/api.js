import express from "express";
import APIController from "../controllers/UserController"
let router=express.Router();    
let initApiRoutes=(app)=>{
    router.get('/users',APIController.getAllUsers)//Request Và Response
    router.post('/login',APIController.handleLogin)
    router.post('/createUser',APIController.handleCreateNewUser)
        return app.use('/api/v1',router);
    }

module.exports=initApiRoutes;