"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const origins = "http://localhost:5173"
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
// Dynamic allowlist (dev: vite at 5173, CRA at 3000)
const corsOptions = {
    origin: (origin, callback) => {
        // allow non-browser tools (curl/postman) with no Origin
        if (!origin)
            return callback(null, true);
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
app.use((0, cors_1.default)(corsOptions));
// Get all cities from the database
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
// typed error handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: err.message });
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
