import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockCities } from "../mockData";
import CityList from "../Components/CityList";
import SearchBar from "../Components/SearchBar";

const LandingPage = () => {
  const navigate = useNavigate();
  const allCities = mockCities;

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
