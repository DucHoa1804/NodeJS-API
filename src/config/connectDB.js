const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('duchoaapi', 'root', '1804', {
  host: 'localhost',
  dialect: 'mysql' 
});

let connectDB =async()=>{//async bat dong bo moi dung dc await
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
}
module.exports = connectDB;