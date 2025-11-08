import AppRoutes from "./Pages/AppRoutes";
import "./App.css";
import { AppProvider } from "./Context/AppStateContext";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
