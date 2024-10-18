const axios = require('axios');
const sequelize = require('./Database');
const PrecipitationObs = require('./Models/PrecipitationModel');
const WeatherStations = require('./Models/WeatherStationModel');
// console.log('axios', axios);

async function getNoManWeatherData() {
  const APIUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/';
  const APICode = 'O-A0001-001';
  const auth = `Authorization=${process.env.AUTH_CODE}`;
  const limitNum = '';
  const format = 'JSON';

  const res = await axios.get(`${APIUrl}${APICode}?${auth}&format=${format}&limit=${limitNum}`);
  // console.log(res.data.success);
  // console.log(res.data.result);
  // console.log(res.data.records);
  // await sequelize.sync({ force: true });

  const resDataStationArray = res.data.records.Station;
  let bulkRainData = [];
  for (let i = 0; i < resDataStationArray.length; i++) {
    const stationname = resDataStationArray[i].StationName;
    const stationid = resDataStationArray[i].StationId;
    const precipitation = resDataStationArray[i].WeatherElement.Now.Precipitation;
    const obstime = resDataStationArray[i].ObsTime.DateTime;

    const rainData = {
      stationname,
      stationid,
      precipitation,
      obstime,
    };
    bulkRainData.push(rainData);

    // 單筆 INSERT
    // console.log(rainData);
    // const newPrecipitationObs = await PrecipitationObs.create(rainData);
    // console.log(newPrecipitationObs);
  }
  // 多筆 INSERT
  // console.log('bulkRainData: ', bulkRainData);
  const newPrecipitationObsBulk = await PrecipitationObs.bulkCreate(bulkRainData);
  // console.log('newPrecipitationObsBulk: ', newPrecipitationObsBulk);
}

async function getManWeatherData() {
  const APIUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/';
  const APICode = 'O-A0003-001';
  const auth = `Authorization=${process.env.AUTH_CODE}`;
  const limitNum = '';
  const format = 'JSON';
  const res = await axios.get(`${APIUrl}${APICode}?${auth}&format=${format}&limit=${limitNum}`);
  const resDataStationArray = res.data.records.Station;
  // console.log(resDataStationArray);
  let bulkRainData = [];
  for (let i = 0; i < resDataStationArray.length; i++) {
    const stationname = resDataStationArray[i].StationName;
    const stationid = resDataStationArray[i].StationId;
    const precipitation = resDataStationArray[i].WeatherElement.Now.Precipitation;
    const obstime = resDataStationArray[i].ObsTime.DateTime;

    const rainData = {
      stationname,
      stationid,
      precipitation,
      obstime,
    };
    bulkRainData.push(rainData);
    // const newPrecipitationObs = await PrecipitationObs.create(rainData);
  }
  const newPrecipitationObsBulk = await PrecipitationObs.bulkCreate(bulkRainData);
}

async function insertWeatherStation() {
  const APIUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/';
  // 有人測站
  // const APICode = 'C-B0074-001';
  // 無人測站
  const APICode = 'C-B0074-002';
  const auth = `Authorization=${process.env.AUTH_CODE}`;
  const jsonFormat = 'format=JSON';

  try {
    const res = await axios.get(`${APIUrl}${APICode}?${auth}&${jsonFormat}`);
    const resDataStationArray = res.data.records.data.stationStatus.station;

    // console.log(resDataStationArray);

    for (let i = 0; i < resDataStationArray.length; i++) {
      const status = resDataStationArray[i].status;
      const StationID = resDataStationArray[i].StationID;
      const StationName = resDataStationArray[i].StationName;
      const StationNameEN = resDataStationArray[i].StationNameEN;
      const StationAltitude = resDataStationArray[i].StationAltitude;
      const StationLongitude = resDataStationArray[i].StationLongitude;
      const StationLatitude = resDataStationArray[i].StationLatitude;
      const CountyName = resDataStationArray[i].CountyName;
      const Location = resDataStationArray[i].Location;
      const StationStartDate = resDataStationArray[i].StationStartDate;
      // 當為空字串時，改為 null
      const StationEndDate =
        resDataStationArray[i].StationEndDate === '' ? null : resDataStationArray[i].StationEndDate;
      const Notes = resDataStationArray[i].Notes;
      const OriginalStationID = resDataStationArray[i].OriginalStationID;
      const NewStationID = resDataStationArray[i].NewStationID;

      const stationData = {
        status,
        StationID,
        StationName,
        StationNameEN,
        StationAltitude,
        StationLongitude,
        StationLatitude,
        CountyName,
        Location,
        StationStartDate,
        StationEndDate,
        Notes,
        OriginalStationID,
        NewStationID,
      };
      const newWeatherStations = await WeatherStations.create(stationData);
    }
  } catch (error) {
    console.log('Error on fetching weather data', error);
  } finally {
    await sequelize.close();
    console.log('DB connection has been closed');
  }
}

async function main() {
  await getNoManWeatherData();
  await getManWeatherData();

  // 可查看連線池狀態的函數, v7 比較完整
  // v6 => 查看連線池 sequelize.connectionManager.pool.{size, available, using, waiting}
  // v7 => sequelize.connectionManager.pool.read.{size, available, using, waiting}
  // or => sequelize.connectionManager.pool.write.{size, available, using, waiting}
  // https://github.com/sequelize/sequelize/issues/13660
  // https://github.com/sequelize/sequelize/issues/16756
  // console.log('Pool Using: ', sequelize.connectionManager.pool.using);

  await sequelize.close();
  console.log('DB connection has been closed');
}

main();

// 一次性取得所有有人、無人測站資料
// insertWeatherStation();
