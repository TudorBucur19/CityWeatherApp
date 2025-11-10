import type { CityDB, CityDBDetails } from "./cityTypes";

export interface IGenericModal {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface ICustomInput {
  label: string;
  type: string;
  name: string;
  fullWidth?: boolean;
  display?: boolean;
}

export interface ICityCard {
  city: CityDBDetails;
}

export interface ICityList {
  allCities: CityDBDetails[];
}

export interface ICItyForm {
  city?: CityDB;
}
export interface ICityDetailsCard {
  city: CityDBDetails;
}

export interface ILabelValueBox {
  label?: string;
  value: string | number;
  icon?: React.ReactElement;
}

export interface IIconLabelRow {
  icon?: React.ReactElement;
  children: React.ReactElement;
}
