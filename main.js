const axios = require('axios');
const sequelize = require('./Database');
const PrecipitationObs = require('./Models/PrecipitationModel');
// console.log('axios', axios);

async function getWeatherData() {
  const APIUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/';
  const APICode = 'O-A0001-001';
  const auth = `Authorization=${process.env.AUTH_CODE}`;
  const limitNum = 'limit=50';
  const jsonFormat = 'format=JSON';
  try {
    const res = await axios.get(`${APIUrl}${APICode}?${auth}&${limitNum}&${jsonFormat}`);
    // console.log(res.data.success);
    // console.log(res.data.result);
    // console.log(res.data.records);
    // await sequelize.sync({ force: true });

    const resDataStationArray = res.data.records.Station;
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
      // console.log(rainData);
      const newPrecipitationObs = await PrecipitationObs.create(rainData);
      // console.log(newPrecipitationObs);
    }
  } catch (error) {
    console.log('Error on fetching weather data', error);
  } finally {
    await sequelize.close();
    console.log('DB connection has been closed');
  }
}

getWeatherData();
