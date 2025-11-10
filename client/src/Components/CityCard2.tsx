import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Rating,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { FC } from "react";
import type { ICityCard } from "../types/components";
import { useAppContext } from "../Context/AppStateContext";
import GenericModal from "./GenericModal";
import CityForm from "./CityForm";
import CityDetailsCard from "./CityDetailsCard";
import IconLabelRow from "./IconLabelRow";

/**
 * CityCard
 * - Material UI only, using `sx` (no styled-components, no Grid)
 * - Action buttons are moved to the bottom via CardActions
 * - Provide your own handlers later; buttons are non-functional by default
 */
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
      <Card variant="outlined" sx={{ width: 360, borderRadius: 2 }}>
        <CardContent>
          {/* Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <PlaceOutlinedIcon />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {city.name}
              </Typography>
            </Stack>
          </Stack>

          {/* Subheader */}
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {city.state}, {city.country}
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          {/* Stats (flex rows) */}
          <Stack spacing={1.5}>
            <IconLabelRow icon={<PeopleOutlineOutlinedIcon fontSize="small" />}>
              <Typography variant="body2">
                {city.estimated_population}
              </Typography>
            </IconLabelRow>
            <IconLabelRow icon={<CalendarMonthOutlinedIcon fontSize="small" />}>
              <Typography variant="body2">{city.date_established}</Typography>
            </IconLabelRow>
            <IconLabelRow>
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating
                  name="read-only"
                  value={city.tourist_rating}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ({city.tourist_rating}/5)
                </Typography>
              </Stack>
            </IconLabelRow>
          </Stack>
        </CardContent>

        {/* Bottom actions */}
        <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: "flex-end" }}>
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
