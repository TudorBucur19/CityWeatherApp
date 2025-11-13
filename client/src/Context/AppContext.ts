import { createContext } from "react";
import type { AppState } from "../types/general";

export const AppContext = createContext<AppState | undefined>(undefined);
