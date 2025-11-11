import axios from "axios";

export const getWeatherData = async (latitude: number, longitude: number) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await axios.get(url);
    const mainWData = response.data.main;
    const wData = response.data.weather[0];
    const wind = response.data.wind;
    const responseSummary = {
      feels_like: mainWData.feels_like,
      humidity: mainWData.humidity,
      pressure: mainWData.pressure,
      temp: mainWData.temp,
      temp_max: mainWData.temp_max,
      temp_min: mainWData.temp_min,
      windSpeed: wind.speed,
      description: wData.description,
    };
    return responseSummary;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    return null;
  }
};
