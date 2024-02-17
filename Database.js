const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// console.log('dotenv', dotenv);
// console.log('SQLize', Sequelize);
// console.log('DataTypes', DataTypes);
dotenv.config();

const sequelize = new Sequelize('Tourism', process.env.POST_ACCT, process.env.POST_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  port: process.env.POST_PORT, // DB connection port
  // 設定連線池
  pool: {
    // 最大連線數
    max: 10,
    // 最小連線數
    min: 0,
    // 獲取連線的最長等待時間(毫秒) - 30秒
    acquire: 30000,
    // 連線閒置時間(毫秒)，超過這個時間將被釋放 - 10秒
    idle: 10000,
  },
});

module.exports = sequelize;
