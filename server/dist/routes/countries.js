"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCountryRoutes = registerCountryRoutes;
const axios_1 = __importDefault(require("axios"));
function registerCountryRoutes(app) {
    app.get("/country/:name", async (req, res) => {
        const { name } = req.params;
        const apiKey = process.env.COUNTRIES_API_KEY;
        const url = `https://api.countrylayer.com/v2/name/${encodeURIComponent(name)}?access_key=${apiKey}&fullText=1`;
        // const url = `https://www.apicountries.com/name/${name}`;
        try {
            const response = await axios_1.default.get(url);
            res.json(response.data);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch country data" });
        }
    });
}
