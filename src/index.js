import express from "express"
import bodyParser from "body-parser"//lây đc các tham số như query,....
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import initApiRoutes from "./route/api"

import connectDB from "./config/connectDB"
require('dotenv').config();
let app= express();
//config âpp
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
viewEngine(app);
initWebRoutes(app);
//api
initApiRoutes(app);

connectDB();
let port = process.env.PORT||6969;
app.listen(port,()=>{
  console.log('backend '+port)
})
