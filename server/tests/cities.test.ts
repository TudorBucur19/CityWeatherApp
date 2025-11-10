import express from "express";
import request from "supertest";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { registerCityRoutes } from "../routes/cities";
import { CityDB } from "../types/cities";

const mockCities: CityDB[] = [
  {
    id: "1",
    name: "Paris",
    state: "Île-de-France",
    country: "France",
    tourist_rating: 9,
    date_established: "300 BC",
    estimated_population: 2148000,
  },
];

// Mock the db module
jest.mock("../db", () => () => ({
  select: jest.fn<() => Promise<CityDB[]>>().mockResolvedValue(mockCities),
}));

describe("registerCityRoutes", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    registerCityRoutes(app);
  });

  it("GET /cities should return cities array", async () => {
    const res = await request(app).get("/cities");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name", "Paris");
  });

  it("GET /cities should handle db errors", async () => {
    jest.resetModules();
    jest.mock("../db", () => () => ({
      select: jest
        .fn<() => Promise<CityDB[]>>()
        .mockRejectedValue(new Error("DB error")),
    }));

    // Re-initialize app and routes to use the new mock
    const app = express();
    app.use(express.json());
    const { registerCityRoutes } = require("../routes/cities");
    registerCityRoutes(app);

    const res = await request(app).get("/cities");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error", "Failed to fetch cities");
  });
});
