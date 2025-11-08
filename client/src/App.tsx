import { useEffect } from "react";

import AppRoutes from "./Pages/AppRoutes";
import "./App.css";
import { AppProvider } from "./Context/AppStateContext";

function App() {
  const fetchApi = async () => {
    fetch("http://localhost:8080/cities");
    try {
      const response = await fetch("http://localhost:8080/cities");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
