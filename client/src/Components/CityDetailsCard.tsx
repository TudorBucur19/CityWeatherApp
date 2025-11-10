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

const CityDetailsCard: FC<ICityDetailsCard> = ({ city }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        maxWidth: 900,
        width: "100%",
        m: "0 auto",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          pt: 2,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 1 }}>
          <PublicOutlinedIcon sx={{ fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {city.name}
          </Typography>
        </Stack>
      </Box>
      <Divider />

      {/* Content */}
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardHeader
            avatar={<LanguageOutlinedIcon />}
            title={
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {`About ${city.name}`}
              </Typography>
            }
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: 2,
                columnGap: 6,
                "& > *": { minWidth: { xs: "100%", sm: 240 } },
              }}
            >
              <LabelValueBox label="Location" value={city.country} />
              <LabelValueBox
                label="Population"
                value={city.estimated_population}
              />
              <LabelValueBox
                label="Established"
                value={city.date_established}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
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
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ({city.tourist_rating}/5)
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Country Details */}
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardHeader
            avatar={<PublicOutlinedIcon />}
            title={
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Country Details
              </Typography>
            }
            sx={{ "& .MuiCardHeader-avatar": { color: "text.secondary" } }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: 2,
                columnGap: 6,
                "& > *": { minWidth: { xs: "100%", sm: 240 } },
              }}
            >
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
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardHeader
            avatar={<ThermostatIcon />}
            title={
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Current Weather
              </Typography>
            }
            sx={{ "& .MuiCardHeader-avatar": { color: "text.secondary" } }}
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
                  value={`${city.weatherInfo.temp_min} m/s`}
                />
              </Stack>
            </Stack>

            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "action.hover"
                    : "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", mb: 0.5 }}
              >
                Conditions
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
          sx={{ justifyContent: "flex-end", pt: 1 }}
        >
          <Button variant="outlined" startIcon={<EditOutlinedIcon />}>
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
  );
};

export default CityDetailsCard;
