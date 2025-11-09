import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AppState } from "../types/general";
import type { CityDBDetails } from "../types/cityTypes";

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchCityResult, setSearchCityResult] = useState<CityDBDetails[]>([]);

  const returnValues = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
      isEditMode,
      setIsEditMode,
      searchCityResult,
      setSearchCityResult,
    }),
    [
      isModalOpen,
      setIsModalOpen,
      isEditMode,
      setIsEditMode,
      searchCityResult,
      setSearchCityResult,
    ]
  );

  return (
    <AppContext.Provider value={returnValues}>{children}</AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
