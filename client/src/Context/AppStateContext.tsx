import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AppState } from "../types";

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const returnValues = useMemo(
    () => ({ isModalOpen, setIsModalOpen, isEditMode, setIsEditMode }),
    [isModalOpen, setIsModalOpen, isEditMode, setIsEditMode]
  );

  return (
    <AppContext.Provider value={returnValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
