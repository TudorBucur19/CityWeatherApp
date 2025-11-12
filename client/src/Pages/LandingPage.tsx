import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Typography } from "@mui/material";

import CityList from "../Components/CityList";
import SearchBar from "../Components/SearchBar";
import { useAppContext } from "../Context/AppStateContext";

import { landingPageStyles as styles } from "../styles/styles";
import { all } from "axios";

const LandingPage = () => {
  const navigate = useNavigate();
  const { searchCityResult, searchTriggered } = useAppContext();
  // const [allCities, setAllCities] = useState([]);
  // const allCities = mockCities;

  // const fetchApi = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/cities");
  //     const data = await response.json();
  //     console.log(data);
  //     setAllCities(data);
  //   } catch (error) {
  //     console.error("Error fetching API:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  return (
    <Container sx={styles.container}>
      <Typography variant="h1" fontSize={"4rem"}>
        City Weather App
      </Typography>
      <SearchBar />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/new-city")}
      >
        Add New City
      </Button>
      <CityList allCities={searchCityResult} />
      {searchCityResult.length === 0 && searchTriggered && (
        <Alert severity="info">No cities match your search.</Alert>
      )}
    </Container>
  );
};

export default LandingPage;
