"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCityRoutes = registerCityRoutes;
const db_1 = __importDefault(require("../db"));
const axios_1 = __importDefault(require("axios"));
const cityService_1 = require("../service/cityService");
const countryService_1 = require("../service/countryService");
const weatherService_1 = require("../service/weatherService");
function registerCityRoutes(app) {
    app.get("/cities", async (req, res) => {
        try {
            const cities = await (0, db_1.default)("cities").select();
            res.json(cities);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch cities" });
        }
    });
    // Add a city to the database
    app.post("/cities", async (req, res) => {
        try {
            const { name, state, country, tourist_rating, date_established, estimated_population, } = req.body;
            if (!name || !country) {
                return res.status(400).json({ error: "Name and country are required" });
            }
            const [id] = await (0, db_1.default)("cities").insert({
                name,
                state,
                country,
                tourist_rating,
                date_established,
                estimated_population,
            });
            const city = await (0, db_1.default)("cities").where({ id }).first();
            res.status(201).json(city);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to add city" });
        }
    });
    // Update a city by ID
    app.patch("/cities/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updated = await (0, db_1.default)("cities").where({ id }).update(updateData);
            if (!updated) {
                return res.status(404).json({ error: "City not found" });
            }
            const city = await (0, db_1.default)("cities").where({ id }).first();
            res.json(city);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to update city" });
        }
    });
    app.delete("/cities/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await (0, db_1.default)("cities").where({ id }).del();
            if (!deleted) {
                return res.status(404).json({ error: "City not found" });
            }
            res.json({ success: true });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete city" });
        }
    });
    app.get("/cities/search/:name", async (req, res) => {
        try {
            const { name } = req.params;
            let cities;
            if (!name || name.trim() === "") {
                cities = await (0, db_1.default)("cities").select();
            }
            else {
                cities = await (0, db_1.default)("cities")
                    .whereRaw("LOWER(name) LIKE ?", [`%${name.toLowerCase()}%`])
                    .select();
            }
            res.json(cities);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to search city" });
        }
    });
    app.get("/geo", async (req, res) => {
        const { q, limit } = req.query;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!q) {
            return res.status(400).json({ error: "City name (q) is required" });
        }
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${limit || 5}&appid=${apiKey}`;
        try {
            const response = await axios_1.default.get(url);
            res.json(response.data);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch geocoding data" });
        }
    });
    app.get("/search-full/:name", async (req, res) => {
        try {
            const { name } = req.params;
            let cities;
            if (!name || name.trim() === "") {
                cities = await (0, db_1.default)("cities").select();
            }
            else {
                cities = await (0, db_1.default)("cities")
                    .whereRaw("LOWER(name) LIKE ?", [`%${name.toLowerCase()}%`])
                    .select();
            }
            const results = await Promise.all(cities.map(async (city) => {
                // Get coordinates
                const geoRes = await (0, cityService_1.getCityGeoData)(name);
                let coordinates = null;
                let latitude, longitude;
                if (geoRes) {
                    ({ latitude, longitude } = geoRes);
                    coordinates = { latitude, longitude };
                }
                // Get country info
                const countryInfo = await (0, countryService_1.getCountryData)(city.country);
                // Get weather info (if coordinates found)
                let weatherInfo = null;
                if (latitude && longitude) {
                    const weatherRes = await (0, weatherService_1.getWeatherData)(latitude, longitude);
                    weatherInfo = weatherRes;
                }
                return {
                    ...city,
                    coordinates,
                    countryInfo,
                    weatherInfo,
                };
            }));
            res.json(results);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch combined city info" });
        }
    });
}
