import { Express, Request, Response } from "express";
import db from "../db";
import axios from "axios";
import { getCityGeoData } from "../service/cityService";
import { getCountryData } from "../service/countryService";
import { getWeatherData } from "../service/weatherService";

export function registerCityRoutes(app: Express) {
  app.get("/cities", async (req: Request, res: Response) => {
    try {
      const cities = await db("cities").select();
      res.json(cities);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });

  // Add a city to the database
  app.post("/cities", async (req: Request, res: Response) => {
    console.log("REQUEST", req);

    try {
      const {
        name,
        state,
        country,
        tourist_rating,
        date_established,
        estimated_population,
      } = req.body;
      if (!name || !country) {
        return res.status(400).json({ error: "Name and country are required" });
      }
      const [id] = await db("cities").insert({
        name,
        state,
        country,
        tourist_rating,
        date_established,
        estimated_population,
      });
      const city = await db("cities").where({ id }).first();
      res.status(201).json(city);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add city" });
    }
  });

  // Update a city by ID
  app.patch("/cities/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updated = await db("cities").where({ id }).update(updateData);
      if (!updated) {
        return res.status(404).json({ error: "City not found" });
      }
      const city = await db("cities").where({ id }).first();
      res.json(city);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update city" });
    }
  });

  app.delete("/cities/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await db("cities").where({ id }).del();
      if (!deleted) {
        return res.status(404).json({ error: "City not found" });
      }
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete city" });
    }
  });

  // app.get("/cities/search/:name", async (req: Request, res: Response) => {
  //   try {
  //     const { name } = req.params;
  //     const cities = await db("cities")
  //       .whereRaw("LOWER(name) LIKE ?", [`%${name.toLowerCase()}%`])
  //       .select();
  //     if (!cities) {
  //       return res.status(404).json({ error: "City not found" });
  //     }
  //     res.json(cities);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Failed to search city" });
  //   }
  // });

  app.get("/cities/search/:name", async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      let cities;
      if (!name || name.trim() === "") {
        cities = await db("cities").select();
      } else {
        cities = await db("cities")
          .whereRaw("LOWER(name) LIKE ?", [`%${name.toLowerCase()}%`])
          .select();
      }
      res.json(cities);
    } catch (err) {
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

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      q as string
    )}&limit=${limit || 5}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch geocoding data" });
    }
  });

  app.get("/search-full/:name", async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      let cities;
      if (!name || name.trim() === "") {
        cities = await db("cities").select();
      } else {
        cities = await db("cities")
          .whereRaw("LOWER(name) LIKE ?", [`%${name.toLowerCase()}%`])
          .select();
      }

      const results = await Promise.all(
        cities.map(async (city: { name: string; country: string }) => {
          // Get coordinates
          const geoRes = await getCityGeoData(name);
          let coordinates = null;
          let latitude, longitude;
          if (geoRes) {
            ({ latitude, longitude } = geoRes);
            coordinates = { latitude, longitude };
          }
          // Get country info
          const countryInfo = await getCountryData(city.country);

          // Get weather info (if coordinates found)
          let weatherInfo = null;
          if (latitude && longitude) {
            const weatherRes = await getWeatherData(latitude, longitude);

            weatherInfo = weatherRes;
          }

          return {
            ...city,
            coordinates,
            countryInfo,
            weatherInfo,
          };
        })
      );

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch combined city info" });
    }
  });
}
