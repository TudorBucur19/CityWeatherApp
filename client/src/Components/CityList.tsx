import type { FC } from "react";
import { Box } from "@mui/material";
import CityCard from "./CityCard";
import type { ICityList } from "../types/components";
import type { CityDBDetails } from "../types/cityTypes";
import CityDetailsCard from "./CityDetailsCard";
import { cityListStyles as styles } from "../styles/styles";
import CityCard2 from "./CityCard2";

const CityList: FC<ICityList> = ({ allCities }) => {
  return (
    <Box sx={styles.citiesContainer}>
      {allCities.map((city: CityDBDetails) => (
        // <CityDetailsCard city={city} key={city.id} />
        // <CityCard city={city} key={city.id} />
        <CityCard2 city={city} key={city.id} />
      ))}
    </Box>
  );
};

export default CityList;
