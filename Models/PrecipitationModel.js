const sequelize = require('../Database');
const { DataTypes } = require('sequelize');

// define data model
const PrecipitationObs = sequelize.define(
  'PrecipitationObs',
  {
    serid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stationname: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    // 氣象署地面氣象站站號為 46 開頭者，為有人氣象站
    // 站號為 C0 和 C1 開頭者，為自動雨量站和自動氣象站
    stationid: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    precipitation: {
      // FLOAT(總長, 小數幾位)
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    obstime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    insertdatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'PrecipitationObs', // 資料庫中的資料表名稱
    timestamps: false, // 不生成 createdAt 和 updatedAt 欄位
  }
);

module.exports = PrecipitationObs;
