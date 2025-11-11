import type { FC } from "react";
import Box from "@mui/material/Box";

import CityCard from "./CityCard";
import type { ICityList } from "../types/components";
import type { CityDBDetails } from "../types/cityTypes";

import { cityListStyles as styles } from "../styles/styles";

const CityList: FC<ICityList> = ({ allCities }) => {
  return (
    <Box sx={styles.citiesContainer}>
      {allCities.map((city: CityDBDetails) => (
        <CityCard city={city} key={city.id} />
      ))}
    </Box>
  );
};

export default CityList;
