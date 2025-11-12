import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import type { ICityCard } from "../types/components";
import { useAppContext } from "../Context/AppStateContext";
import GenericModal from "./GenericModal";
import CityForm from "./CityForm";
import CityDetailsCard from "./CityDetailsCard";
import IconLabelRow from "./IconLabelRow";

import { cityCardStyles as styles } from "../styles/styles";
import { handleDeleteCity } from "../service/databaseOperations";

const CityCard: FC<ICityCard> = ({ city }) => {
  const { isModalOpen, isEditMode, onEditClick, modalCloseHandler } =
    useAppContext();
  const navigate = useNavigate();

  const navigateToDetailsPage = () => {
    navigate(`/city/${city.id}`);
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
      <Card variant="outlined" sx={styles.card}>
        <CardContent onClick={navigateToDetailsPage} sx={styles.cardContent}>
          {/* Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={styles.headerStack}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <PlaceOutlinedIcon />
              <Typography variant="h6" sx={styles.name}>
                {name}
              </Typography>
            </Stack>
          </Stack>

          {/* Subheader */}
          <Typography variant="body2" sx={styles.subheader}>
            {state}, {country}
          </Typography>

          <Divider sx={styles.divider} />

          {/* Stats (flex rows) */}
          <Stack spacing={1.5}>
            <IconLabelRow icon={<PeopleOutlineOutlinedIcon fontSize="small" />}>
              <Typography variant="body2">{estimated_population}</Typography>
            </IconLabelRow>
            <IconLabelRow icon={<CalendarMonthOutlinedIcon fontSize="small" />}>
              <Typography variant="body2">{date_established}</Typography>
            </IconLabelRow>
            <IconLabelRow>
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating
                  name="read-only"
                  value={tourist_rating}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" sx={styles.ratingText}>
                  ({tourist_rating}/5)
                </Typography>
              </Stack>
            </IconLabelRow>
          </Stack>
        </CardContent>

        {/* Bottom actions */}
        <CardActions sx={styles.actions}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onEditClick();
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCity(id);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <GenericModal open={isModalOpen} handleClose={modalCloseHandler}>
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
