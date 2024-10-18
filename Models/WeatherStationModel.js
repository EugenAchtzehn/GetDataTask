const sequelize = require('../Database');
const { DataTypes } = require('sequelize');

// define data model
const WeatherStations = sequelize.define(
  'WeatherStations',
  {
    SerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    StationID: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    StationName: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    StationNameEN: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    StationAltitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    StationLongitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    StationLatitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    CountyName: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    StationStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    StationEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OriginalStationID: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    NewStationID: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    tableName: 'WeatherStations', // 資料庫中的資料表名稱
    timestamps: true,
  }
);

module.exports = WeatherStations;
