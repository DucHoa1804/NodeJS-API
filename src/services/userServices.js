import db from "../models/index"
 import bcrypt from "bcryptjs"
const salt=bcrypt.genSaltSync(10);
let hashUserPassword=(password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let hashPassword=await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}
// //check email
let checkEmail=(userEmail)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user=await db.User.findOne({
                where:{email:userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e);
        }
    })
}
let createNewUsers=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            //check user co ton tai hay chua
            let check=await checkEmail(data.email);
            if(check===true){
                resolve({
                    errCode:1,
                    message: 'Your email is already in used, Pleace try another email!'
                })
            }
            let hashPasswordFormBcrypt=await hashUserPassword(data.password);
            await db.User.create({
                email:data.email,
                password:hashPasswordFormBcrypt,
                firstName:data.firstName ,
                lastName: data.lastName,
                phone:data.phone,
                address:data.address,
                gender:data.gender==='1' ? true : false,
                roleid:data.roleid,
            })
            resolve({
                errCode:0,
                message:"created susseed"
            })
        }catch(e){
            reject(e);
        }
    })
}
let handleUserLogin=(email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let userData={}
            let isExist= await checkEmail(email);
            if(isExist){
                   let user = await db.User.findOne({
                        attributes:['email', 'roleid','password'],//chỉ lấy thông tin yêu cầu để sét đk đăng nhập 
                        where:{email:email},
                        raw:true,
                   });
                   if(user){
                    let check = await bcrypt.compareSync(password, user.password);
                        if(check){
                            userData.errCode=0;
                            userData.errMessage='Oke';
                            delete user.password;
                            userData.user=user;
                        }else{
                            userData.errCode=3;
                            userData.errMessage='Sai mật khẩu nhé!(Wrong Password)';
                        }
                    }else{
                        userData.errCode=2;
                        userData.errMessage='Người dùng không tồn tại!'
                    }
            } else{
                userData.errCode=1;
                userData.errMessage=`Tai khoan cua ban khong ton tai trong he thong. Vui long dung một email khác`;
             }
             resolve(userData)
        }catch(e){
                reject(e)
        }
    })
}

module.exports ={
    createNewUsers:createNewUsers,
    handleUserLogin:handleUserLogin,
}