import { Box, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppContext } from "../Context/AppStateContext";
import { mockCities } from "../mockData";
import { searchBarStyles as styles } from "../styles/styles";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchCityResult } = useAppContext();
  const searchCity = async (name: string) => {
    // setSearchCityResult((prev) => [...prev, ...mockCities]);
    try {
      const response = await fetch(
        `http://localhost:8080/search-full/${encodeURIComponent(name)}`
      );
      if (!response.ok) throw new Error("City not found");
      const cities = await response.json();
      console.log("Found city:", cities);
      setSearchCityResult((prev) => [...prev, ...cities]);
    } catch (err) {
      console.error("Error searching city:", err);
      setSearchCityResult([]);
    }
  };

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  onClick={() => searchCity(searchQuery)}
                  sx={styles.searchBtn}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
