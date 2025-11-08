import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import type { ICityCard } from "../types";
import { Button } from "@mui/material";
import GenericModal from "./GenericModal";
import CityForm from "./CityForm";
import { useAppContext } from "../Context/AppStateContext";
import type { FC } from "react";

const styles = {
  cardItemContainer: {
    transition: "transform 180ms, box-shadow 180ms",
    "&:hover": {
      transform: "translateY(-8px)",
    },
  },
};

const CityCard: FC<ICityCard> = ({ city }) => {
  const { isModalOpen, setIsModalOpen, setIsEditMode } = useAppContext();
  const onEditClick = () => {
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleDeleteCity = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete city");
    } catch (err) {
      console.error(err);
    }
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
        <CardHeader title={name + id} />
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
          <Button
            size="small"
            color="error"
            onClick={() => handleDeleteCity(id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <GenericModal
        open={isModalOpen}
        handleClose={modalCloseHandler}
        title="City Details"
      >
        <CityForm city={city} />
      </GenericModal>
    </>
  );
};

export default CityCard;
