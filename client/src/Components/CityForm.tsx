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
import { useEffect, type FC } from "react";
import { cityFormFields } from "../Constants/formConstants";
import { useNavigate } from "react-router-dom";
import type { ICItyForm } from "../types/components";
import type {
  CityPayload,
  CityTextFormFields,
  EditCityPayload,
} from "../types/cityTypes";

import { cityFormStyles as styles } from "../styles/styles";

const CityForm: FC<ICItyForm> = ({ city }) => {
  const { setIsModalOpen, isEditMode, setIsEditMode } = useAppContext();
  const navigate = useNavigate();
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
      tourist_rating: city?.tourist_rating ?? 3,
      date_established: city?.date_established || "",
      estimated_population: city?.estimated_population || 0,
    },
  });

  // Update form values when city changes (e.g., when opening modal)
  useEffect(() => {
    if (city) {
      setValue("name", city.name || "");
      setValue("state", city.state || "");
      setValue("country", city.country || "");
      setValue("tourist_rating", city.tourist_rating ?? 3);
      setValue("date_established", city.date_established || "");
      setValue("estimated_population", city.estimated_population || 0);
    }
  }, [city, setValue]);

  const onSubmit = async (data: CityPayload) => {
    console.log("DATA FOR PAYLOAD", data);
    const payload = {
      name: data.name,
      state: data.state.trim() === "" ? "" : data.state,
      country: data.country,
      tourist_rating: data.tourist_rating ?? 1,
      date_established: data.date_established || "",
      estimated_population: data.estimated_population,
    };

    console.log("PAYLOAD", payload);

    try {
      const response = await fetch("http://localhost:8080/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to add city");
      const newCity = await response.json();
      console.log("CITY API RESPONSE", newCity);

      // Optionally update city list or close modal here
    } catch (err) {
      console.error(err);
      // Optionally show error to user
    } finally {
      navigate("/");
    }
  };

  const onEditSubmit = async (data: EditCityPayload) => {
    if (!data.id) return; // Ensure city has an id
    const payload = {
      estimated_population: data.estimated_population,
      date_established: data.date_established,
      tourist_rating: data.tourist_rating,
    };

    try {
      const response = await fetch(`http://localhost:8080/cities/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update city");
      const updatedCity = await response.json();
      console.log("CITY API RESPONSE", updatedCity);
      // Optionally update city list or close modal here
    } catch (err) {
      console.error(err);
      // Optionally show error to user
    } finally {
      setIsModalOpen(false);
      setIsEditMode(false);
    }
  };

  const formSubmitHandler =
    isEditMode && city
      ? handleSubmit((data) => onEditSubmit({ ...data, id: city.id }))
      : handleSubmit(onSubmit);
  const onCancel = () => {
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const cancelHandler = () => {
    if (isEditMode) {
      onCancel();
    } else {
      reset();
    }
  };
  const formTitle = isEditMode ? "Edit City" : "Add City";
  const formDescription = isEditMode
    ? `Update ${city?.name} details below.`
    : "Fill in the details to add a new city.";
  const submitBtnText = isEditMode ? "Update City" : "Add City";
  const cancelBtnText = isEditMode ? "Cancel" : "Reset";
  return (
    <Card variant="outlined">
      <CardHeader title={formTitle} subheader={formDescription} />
      <CardContent>
        <Box component="form" sx={styles.formContainer}>
          {cityFormFields(!isEditMode).map((field: CityTextFormFields) => (
            <TextField
              key={field.name}
              label={field.label}
              type={field.type}
              fullWidth={field.fullWidth}
              required={field.required}
              {...register(field.name)}
              sx={{ display: field.display ? "block" : "none" }}
            />
          ))}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ height: "56px" }}
          >
            <Typography sx={{ minWidth: 80 }}>Rating</Typography>
            <Controller
              name="tourist_rating"
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

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={cancelHandler}
              disabled={isSubmitting}
            >
              {cancelBtnText}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              onClick={formSubmitHandler}
            >
              {submitBtnText}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CityForm;
