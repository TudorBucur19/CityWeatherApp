import axios from "axios";
import { Express, Request, Response } from "express";

export function registerWeatherRoutes(app: Express) {
  app.get("/weather", async (req: Request, res: Response) => {
    const { lat, lon, exclude } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });
}
