"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWeatherRoutes = registerWeatherRoutes;
const axios_1 = __importDefault(require("axios"));
function registerWeatherRoutes(app) {
    app.get("/weather", async (req, res) => {
        const { lat, lon, exclude } = req.query;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        console.log(apiKey);
        if (!lat || !lon) {
            return res
                .status(400)
                .json({ error: "Latitude and longitude are required" });
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        try {
            const response = await axios_1.default.get(url);
            res.json(response.data);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch weather data" });
        }
    });
}
