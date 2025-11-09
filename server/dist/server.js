"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cities_1 = require("./routes/cities");
const countries_1 = require("./routes/countries");
const weather_1 = require("./routes/weather");
dotenv_1.default.config();
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
(0, cities_1.registerCityRoutes)(app);
(0, countries_1.registerCountryRoutes)(app);
(0, weather_1.registerWeatherRoutes)(app);
// typed error handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: err.message });
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
