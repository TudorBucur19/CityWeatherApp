import type { FC } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { ICityDetailsCard } from "../types/components";
import LabelValueBox from "./LabelValueBox";
import { kelvinToCelsius } from "../Utils/helperFunctions";
import { cityDetailsCardStyles as styles } from "../styles/styles";
import GenericModal from "./GenericModal";
import CityForm from "./CityForm";
import { useAppContext } from "../Context/AppStateContext";

const CityDetailsCard: FC<ICityDetailsCard> = ({ city }) => {
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

  return (
    <>
      <Paper elevation={1} sx={styles.paper}>
        {/* Header */}
        <Box sx={styles.headerBox}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={styles.headerStack}
          >
            <PublicOutlinedIcon sx={styles.headerIcon} />
            <Typography variant="subtitle1" sx={styles.headerText}>
              {city.name}
            </Typography>
          </Stack>
        </Box>
        <Divider sx={styles.divider} />

        {/* Content */}
        <Box sx={styles.contentBox}>
          <Card variant="outlined" sx={styles.card}>
            <CardHeader
              avatar={<LanguageOutlinedIcon />}
              title={
                <Typography variant="h6" sx={styles.aboutTitle}>
                  {`About ${city.name}`}
                </Typography>
              }
            />
            <CardContent>
              <Box sx={styles.labelValueBox}>
                <LabelValueBox label="Location" value={city.country} />
                <LabelValueBox
                  label="Population"
                  value={city.estimated_population}
                />
                <LabelValueBox
                  label="Established"
                  value={city.date_established}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Typography variant="caption" sx={styles.ratingCaption}>
                    Tourist Rating
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating
                      name="read-only"
                      value={city.tourist_rating}
                      max={5}
                      precision={1}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={styles.ratingText}>
                      ({city.tourist_rating}/5)
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Country Details */}
          <Card variant="outlined" sx={styles.card}>
            <CardHeader
              avatar={<PublicOutlinedIcon />}
              title={
                <Typography variant="h6" sx={styles.aboutTitle}>
                  Country Details
                </Typography>
              }
              sx={styles.cardHeader}
            />
            <CardContent>
              <Box sx={styles.labelValueBox}>
                <LabelValueBox
                  label="Country Code (2)"
                  value={city.countryInfo.twoDigitCode}
                />
                <LabelValueBox
                  label="Country Code (3)"
                  value={city.countryInfo.threeDigitCode}
                />
                {/* <LabelValueBox label="Currency" value={city.countryInfo.currency} /> */}
              </Box>
            </CardContent>
          </Card>

          {/* Current Weather */}
          <Card variant="outlined" sx={styles.card}>
            <CardHeader
              avatar={<ThermostatIcon />}
              title={
                <Typography variant="h6" sx={styles.aboutTitle}>
                  Current Weather
                </Typography>
              }
              sx={styles.cardHeader}
            />
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                useFlexGap
                flexWrap="wrap"
              >
                <Stack direction="row" spacing={6} useFlexGap>
                  <LabelValueBox
                    icon={<ThermostatIcon fontSize="small" />}
                    label="Temperature"
                    value={`${kelvinToCelsius(city.weatherInfo.temp)}°C`}
                  />
                  <LabelValueBox
                    icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                    label="Feels Like"
                    value={`${kelvinToCelsius(city.weatherInfo.feels_like)}°C`}
                  />
                </Stack>
                <Stack direction="row" spacing={6} useFlexGap>
                  <LabelValueBox
                    icon={<OpacityOutlinedIcon fontSize="small" />}
                    label="Humidity"
                    value={`${city.weatherInfo.humidity}%`}
                  />
                  <LabelValueBox
                    icon={<AirOutlinedIcon fontSize="small" />}
                    label="Wind Speed"
                    value={`${city.weatherInfo.windSpeed} m/s`}
                  />
                </Stack>
              </Stack>

              <Box sx={styles.weatherConditionsBox}>
                <Typography
                  variant="subtitle2"
                  sx={styles.weatherConditionsTitle}
                >
                  Summary weather conditions
                </Typography>
                <Typography variant="body2">
                  {city.weatherInfo.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={styles.footerStack}
          >
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={onEditClick}
            >
              Edit City
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteOutlineOutlinedIcon />}
            >
              Delete City
            </Button>
          </Stack>
        </Box>
      </Paper>
      <GenericModal open={isModalOpen} handleClose={modalCloseHandler}>
        {isEditMode && <CityForm city={city} />}
      </GenericModal>
    </>
  );
};

export default CityDetailsCard;
