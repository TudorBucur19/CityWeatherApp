import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import type { ICityCard } from "../types/components";
import { Button, Rating, Stack } from "@mui/material";
import GenericModal from "./GenericModal";
import CityForm from "./CityForm";
import { useAppContext } from "../Context/AppStateContext";
import type { FC } from "react";
import CityDetailsCard from "./CityDetailsCard";

const styles = {
  cardItemContainer: {
    cursor: "pointer",
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
      <Card
        variant="outlined"
        sx={styles.cardItemContainer}
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader title={name} />
        <CardContent>
          <Typography variant="body1">State: {state}</Typography>
          <Typography variant="body1">Country: {country}</Typography>
          <Typography variant="body1">Tourists reviews:</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating
              name="read-only"
              value={tourist_rating}
              max={5}
              precision={1}
              readOnly
              size="small"
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ({tourist_rating}/5)
            </Typography>
          </Stack>
          <Typography variant="body1">
            Established: {date_established}
          </Typography>
          <Typography variant="body1">
            Population: {estimated_population}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick();
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCity(id);
            }}
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
        {isEditMode ? (
          <CityForm city={city} />
        ) : (
          <CityDetailsCard city={city} />
        )}
      </GenericModal>
    </>
  );
};

export default CityCard;
