import express from "express"
import userServices from '../services/userServices'
let getAllUsers =(req,res)=>{
        return res.status(200).json({
            message:'oke nha cu'
        })
}
let handleLogin=async(req,res)=>{
    let email = req.body.email;
    let password=req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message:'Lỗi chưa nhập email Hoặc mk',
        })
    }
    let userData= await userServices.handleUserLogin(email,password);
    console.log(userData);
    return res.status(200).json({
        errCode:userData.errCode,
        message:userData.errMessage,
        user: userData.user ? userData.user:{}
    })

}

let handleCreateNewUser=async(req,res)=>{
   let message = await userServices.createNewUsers(req.body);
   console.log(message);
   return res.status(200).json(message);
}
module.exports={
    getAllUsers:getAllUsers,
    handleCreateNewUser:handleCreateNewUser,
    handleLogin:handleLogin,
   
}