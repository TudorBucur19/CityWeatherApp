import { useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CityDBDetails } from "../types/cityTypes";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchCityResult, setSearchCityResult] = useState<CityDBDetails[]>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const modalCloseHandler = useCallback(() => {
    setIsModalOpen(false);
    setIsEditMode(false);
  }, []);

  const backButtonHandler = useCallback(() => {
    globalThis.history.back();
  }, []);

  const onEditClick = useCallback(() => {
    setIsModalOpen(true);
    setIsEditMode(true);
  }, []);

  const returnValues = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
      isEditMode,
      setIsEditMode,
      searchCityResult,
      setSearchCityResult,
      modalCloseHandler,
      backButtonHandler,
      onEditClick,
      searchTriggered,
      setSearchTriggered,
    }),
    [
      isModalOpen,
      isEditMode,
      searchCityResult,
      searchTriggered,
      backButtonHandler,
      modalCloseHandler,
      onEditClick,
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
