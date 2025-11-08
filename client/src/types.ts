export interface City {
  id: string;
  name: string;
  state?: string | null;
  country: string;
  tourist_rating: number;
  date_established?: string;
  estimated_population?: number;
}

export interface ICityCard {
  city: City;
}

export interface ICityList {
  allCities: City[];
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
