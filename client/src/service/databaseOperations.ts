import type { CityPayload, EditCityPayload } from "../types/cityTypes";

export const handleDeleteCity = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/cities/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete city");
  } catch (err) {
    console.error(err);
  }
};

export const addNewCityToDB = async (
  data: CityPayload,
  finallyAction: () => void
) => {
  const payload = {
    name: data.name,
    state: data.state.trim() === "" ? "" : data.state,
    country: data.country,
    tourist_rating: data.tourist_rating ?? 1,
    date_established: data.date_established || "",
    estimated_population: data.estimated_population,
  };

  try {
    const response = await fetch("http://localhost:8080/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to add city");
    const newCity = await response.json();
    console.log("CITY API RESPONSE", newCity);
  } catch (err) {
    console.error(err);
  } finally {
    finallyAction();
  }
};

export const editCityHandler = async (
  data: EditCityPayload,
  finallyCallback: () => void
) => {
  if (!data.id) return; // Ensure city has an id
  const payload = {
    estimated_population: data.estimated_population,
    date_established: data.date_established,
    tourist_rating: data.tourist_rating,
  };

  try {
    const response = await fetch(`http://localhost:8080/cities/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to update city");
    const updatedCity = await response.json();
    console.log("CITY API RESPONSE", updatedCity);
  } catch (err) {
    console.error(err);
  } finally {
    finallyCallback();
  }
};
