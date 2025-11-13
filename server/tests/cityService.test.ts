import axios from "axios";
import { getCityGeoData } from "../service/cityService";

describe("getCityGeoData", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns parsed city geo data when axios succeeds", async () => {
    const mockData = [{ name: "London", lat: 51.5074, lon: -0.1278 }];
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockData });

    const result = await getCityGeoData("London");
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("London"));
    expect(result).toEqual({
      name: "London",
      latitude: 51.5074,
      longitude: -0.1278,
    });
  });

  it("returns null when axios returns empty array", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
    const result = await getCityGeoData("UnknownCity");
    expect(result).toBeNull();
  });

  it("returns null when axios throws error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Network error"));
    const result = await getCityGeoData("ErrorCity");
    expect(result).toBeNull();
  });
});
