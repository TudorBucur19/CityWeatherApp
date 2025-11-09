"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityGeoData = void 0;
const axios_1 = __importDefault(require("axios"));
const getCityGeoData = async (cityName) => {
    try {
        const geoRes = await axios_1.default.get(`http://localhost:8080/geo?q=${encodeURIComponent(cityName)}`);
        const geoData = geoRes.data;
        console.log(geoData[0]); // geoData is an array, take first result
        const parsedResponse = geoData[0]
            ? {
                name: geoData[0].name,
                latitude: geoData[0].lat,
                longitude: geoData[0].lon,
            }
            : null;
        return parsedResponse;
    }
    catch (err) {
        console.error("Error fetching geo data:", err);
        return null;
    }
};
exports.getCityGeoData = getCityGeoData;
