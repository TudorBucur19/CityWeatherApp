"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = void 0;
const axios_1 = __importDefault(require("axios"));
const getWeatherData = async (latitude, longitude) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const response = await axios_1.default.get(url);
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
    }
    catch (err) {
        console.error("Error fetching weather data:", err);
        return null;
    }
};
exports.getWeatherData = getWeatherData;
