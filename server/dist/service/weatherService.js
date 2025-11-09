"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = void 0;
const axios_1 = __importDefault(require("axios"));
const getWeatherData = async (latitude, longitude) => {
    try {
        const apiKey2 = process.env.OPENWEATHER_API_KEY;
        console.log("APIKEY2", apiKey2);
        const apiKey = "d3c5e9c2fc79daaeabc009361c0251f3";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const response = await axios_1.default.get(url);
        console.log(response);
        return response.data;
    }
    catch (err) {
        console.error("Error fetching weather data:", err);
        return null;
    }
};
exports.getWeatherData = getWeatherData;
