// SimpleAddCityForm.tsx
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../Context/AppStateContext";

import type { ICityCard } from "../types";
import { useEffect } from "react";

type Props = {
  apiBaseUrl?: string;
  onCreated?: (city: any) => void;
  city?: ICityCard["city"];
};

const CityForm = ({ apiBaseUrl = "/api", onCreated, city }: Props) => {
  const { isModalOpen, setIsModalOpen, isEditMode, setIsEditMode } =
    useAppContext();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      name: city?.name || "",
      state: city?.state || "",
      country: city?.country || "",
      touristRating: city?.tourist_rating ?? 3,
      dateEstablished: city?.date_established || "",
      estimatedPopulation: city?.estimated_population?.toString() || "",
    },
  });

  // Update form values when city changes (e.g., when opening modal)
  useEffect(() => {
    if (city) {
      setValue("name", city.name || "");
      setValue("state", city.state || "");
      setValue("country", city.country || "");
      setValue("touristRating", city.tourist_rating ?? 3);
      setValue("dateEstablished", city.date_established || "");
      setValue(
        "estimatedPopulation",
        city.estimated_population?.toString() || ""
      );
    }
  }, [city, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        state: data.state.trim() === "" ? null : data.state,
        country: data.country,
        tourist_rating: data.touristRating ?? 0,
        date_established: data.dateEstablished || undefined,
        estimated_population:
          data.estimatedPopulation.trim() === ""
            ? undefined
            : Number(data.estimatedPopulation),
      };

      console.log("PAYLOAD", payload);

      // const r = await fetch(`${apiBaseUrl}/cities`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // const result = await r.json();
      // if (!r.ok) throw new Error(result?.message || "Failed to create");

      // onCreated?.(result);
      // reset();
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    container: {
      maxWidth: 900,
      margin: "0 auto",
      padding: "1rem",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  };
  return (
    <Card variant="outlined">
      <CardHeader title="Add City" />
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={styles.formContainer}
        >
          <TextField
            label="City Name"
            fullWidth
            {...register("name", { required: true })}
          />

          <TextField
            label="State / Sub-region"
            fullWidth
            {...register("state")}
          />

          <TextField
            label="Country"
            fullWidth
            {...register("country", { required: true })}
          />

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ height: "56px" }}
          >
            <Typography sx={{ minWidth: 80 }}>Rating</Typography>
            <Controller
              name="touristRating"
              control={control}
              render={({ field }) => (
                <Rating
                  {...field}
                  value={field.value}
                  onChange={(_e, v) => field.onChange(v)}
                  precision={1}
                  max={5}
                />
              )}
            />
          </Stack>

          <TextField
            label="Date Established"
            type="date"
            fullWidth
            {...register("dateEstablished")}
          />

          <TextField
            label="Estimated Population"
            type="number"
            fullWidth
            {...register("estimatedPopulation")}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save City"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CityForm;
