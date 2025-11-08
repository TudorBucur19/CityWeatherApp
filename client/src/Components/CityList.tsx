import { Box } from "@mui/material";
import type { City, ICityList } from "../types";
import CityCard from "./CityCard";
import type { FC } from "react";

const styles = {
  citiesContainer: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: { xs: "1.2rem", sm: "1.6rem", md: "2rem" },
    padding: "1rem",
  },
};

const CityList: FC<ICityList> = ({ allCities }) => {
  return (
    <Box sx={styles.citiesContainer}>
      {allCities.map((city: City) => (
        <CityCard city={city} key={city.id} />
      ))}
    </Box>
  );
};

export default CityList;
