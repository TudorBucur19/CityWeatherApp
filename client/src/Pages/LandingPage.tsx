import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockCities } from "../mockData";
import CityList from "../Components/CityList";
import SearchBar from "../Components/SearchBar";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [allCities, setAllCities] = useState([]);
  // const allCities = mockCities;

  const fetchApi = async () => {
    try {
      const response = await fetch("http://localhost:8080/cities");
      const data = await response.json();
      console.log(data);
      setAllCities(data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Container>
      <Typography variant="h1">City Weather App</Typography>
      <SearchBar />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/new-city")}
      >
        Add New City
      </Button>
      <CityList allCities={allCities} />
    </Container>
  );
};

export default LandingPage;
