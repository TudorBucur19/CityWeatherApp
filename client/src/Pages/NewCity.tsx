import { Container, Typography } from "@mui/material";
import CityForm from "../Components/CityForm";

const NewCity = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h1" fontSize={64}>
        Add New City
      </Typography>
      <CityForm />
    </Container>
  );
};

export default NewCity;
