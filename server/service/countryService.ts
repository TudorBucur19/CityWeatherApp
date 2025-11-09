import axios from "axios";

export const getCountryData = async (country: string) => {
  const countryApiKey = process.env.COUNTRIES_API_KEY;
  try {
    const countryRes = await axios.get(
      `https://api.countrylayer.com/v2/name/${encodeURIComponent(
        country
      )}?access_key=${"d06b7ae7299ce8ca1d76576f91345c1b"}&fullText=1`
    );
    const countryInfo = countryRes.data[0] || null;
    const parsedResponse = {
      name: countryInfo.name,
      twoDigitCode: countryInfo.alpha2Code,
      threeDigitCode: countryInfo.alpha3Code,
    };
    return parsedResponse;
  } catch (err) {
    console.error("Error fetching country data:", err);
    return null;
  }
};
