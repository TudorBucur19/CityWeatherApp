import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";

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

app.get("/cities", (req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post("/echo", (req: Request, res: Response) => {
  res.json({ body: req.body });
});

// typed error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
