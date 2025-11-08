import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import db from "./db";

const app = express();
app.use(express.json());

const origins = "http://localhost:5173"
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Dynamic allowlist (dev: vite at 5173, CRA at 3000)
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // allow non-browser tools (curl/postman) with no Origin
    if (!origin) return callback(null, true);
    if (origins.length === 0 || origins.includes(origin))
      return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["X-Total-Count"], // if you paginate, etc.
  credentials: process.env.CORS_CREDENTIALS === "true", // needed for cookies/auth across origins
  maxAge: 600, // cache preflight for 10 minutes
};
app.use(cors(corsOptions));

// Get all cities from the database
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

// typed error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
