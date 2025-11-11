export interface CityPayload {
  name: string;
  state: string;
  country: string;
  tourist_rating: number;
  date_established: string;
  estimated_population: number;
}

export interface CityDB extends CityPayload {
  id: string;
}

export interface EditCityPayload {
  id: string;
  tourist_rating: number;
  date_established: string;
  estimated_population: number;
}

export type FieldNameOptions =
  | "name"
  | "state"
  | "country"
  | "date_established"
  | "estimated_population";

export interface CityTextFormFields {
  label: string;
  type: string;
  name: FieldNameOptions;
  fullWidth: boolean;
  required: boolean;
  display: boolean;
}

export interface CityDBDetails extends CityDB {
  coordinates: CityCoordinates;
  countryInfo: CountryInfo;
  weatherInfo: CityWeather;
}

export type CityCoordinates = {
  latitude: number;
  longitude: number;
};

export type CountryInfo = {
  name: string;
  twoDigitCode: string;
  threeDigitCode: string;
};

export type CityWeather = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
  windSpeed: number;
  description: string;
};
