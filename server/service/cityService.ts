import axios from "axios";

export const getCityGeoData = async (cityName: string) => {
  try {
    const geoRes = await axios.get(
      `http://localhost:8080/geo?q=${encodeURIComponent(cityName)}`
    );
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
  } catch (err) {
    console.error("Error fetching geo data:", err);
    return null;
  }
};
