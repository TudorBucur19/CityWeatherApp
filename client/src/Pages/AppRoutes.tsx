import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import AppLayout from "./AppLayout";
import NewCity from "./NewCity";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/new-city" element={<NewCity />} />
      </Route>
    </Routes>
  );
}
