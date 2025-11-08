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

export interface ICityCard {
  city: CityDB;
}

export interface ICityList {
  allCities: CityDB[];
}

export interface IGenericModal {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export type AppState = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (isEdit: boolean) => void;
};

export interface ICustomInput {
  label: string;
  type: string;
  name: string;
  fullWidth?: boolean;
  display?: boolean;
}

export interface ICItyForm {
  city: CityDB;
}
