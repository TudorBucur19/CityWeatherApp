import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import type { ICityCard } from "../types";
import { useState, type FC } from "react";
import { Button } from "@mui/material";
import GenericModal from "./GenericModal";
import CityForm from "./CityForm";
import { useAppContext } from "../Context/AppStateContext";
import { set } from "zod";

const styles = {
  cardItemContainer: {
    transition: "transform 180ms, box-shadow 180ms",
    "&:hover": {
      transform: "translateY(-8px)",
    },
  },
};

const CityCard: FC<ICityCard> = ({ city }) => {
  const { isModalOpen, setIsModalOpen, isEditMode, setIsEditMode } =
    useAppContext();
  const onEditClick = () => {
    setIsModalOpen(true);
    setIsEditMode(true);
  };
  const {
    id,
    name,
    state,
    country,
    tourist_rating,
    date_established,
    estimated_population,
  } = city;

  return (
    <>
      <Card variant="outlined" sx={styles.cardItemContainer}>
        <CardHeader title={name} />
        <CardContent>
          <Typography variant="body1">State: {state}</Typography>
          <Typography variant="body1">Country: {country}</Typography>
          <Typography variant="body1">Rating: {tourist_rating}/5</Typography>
          <Typography variant="body1">
            Established: {date_established}
          </Typography>
          <Typography variant="body1">
            Population: {estimated_population}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onEditClick}>
            Edit
          </Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
      <GenericModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="City Details"
      >
        <CityForm city={city} />
      </GenericModal>
    </>
  );
};

export default CityCard;
