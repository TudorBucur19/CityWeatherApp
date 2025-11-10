import { Express, Request, Response } from "express";
import axios from "axios";

export function registerCountryRoutes(app: Express) {
  app.get("/country/:name", async (req: Request, res: Response) => {
    const { name } = req.params;
    const apiKey = process.env.COUNTRIES_API_KEY;
    const url = `https://api.countrylayer.com/v2/name/${encodeURIComponent(
      name
    )}?access_key=${apiKey}&fullText=1`;

    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch country data" });
    }
  });
}
