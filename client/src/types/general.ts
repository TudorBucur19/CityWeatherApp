import type { CityDBDetails } from "./cityTypes";

export type AppState = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  searchCityResult: CityDBDetails[];
  setSearchCityResult: React.Dispatch<React.SetStateAction<CityDBDetails[]>>;
  modalCloseHandler: () => void;
  backButtonHandler: () => void;
  onEditClick: () => void;
  searchTriggered: boolean;
  setSearchTriggered: React.Dispatch<React.SetStateAction<boolean>>;
};
