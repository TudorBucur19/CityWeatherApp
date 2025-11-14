// SimpleAddCityForm.tsx
import { useEffect, type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";

import { useAppContext } from "../Context/AppStateContext";
import { cityFormFields } from "../Constants/formConstants";
import type { ICItyForm } from "../types/components";
import type { CityTextFormFields } from "../types/cityTypes";
import { addNewCityToDB, editCityHandler } from "../service/databaseOperations";

import { cityFormStyles as styles } from "../styles/styles";
import { citySchema } from "../schemas/citySchema";

const CityForm: FC<ICItyForm> = ({ city }) => {
  const {
    setIsModalOpen,
    isEditMode,
    setIsEditMode,
    backButtonHandler,
    modalCloseHandler,
  } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm({
    resolver: zodResolver(citySchema),
    defaultValues: {
      name: city?.name || "",
      state: city?.state || "",
      country: city?.country || "",
      tourist_rating: city?.tourist_rating ?? 3,
      date_established: city?.date_established || "",
      estimated_population: city?.estimated_population || 0,
    },
    mode: "onBlur",
    criteriaMode: "all",
    reValidateMode: "onBlur",
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

  const formSubmitHandler =
    isEditMode && city
      ? handleSubmit((data) =>
          editCityHandler({ ...data, id: city.id }, modalCloseHandler)
        )
      : handleSubmit((data) => addNewCityToDB(data, () => navigate("/")));
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
              {...(field.type === "date"
                ? { InputLabelProps: { shrink: true } }
                : {})}
              sx={{ display: field.display ? "block" : "none" }}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message as string}
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

          <Stack
            direction="row"
            spacing={2}
            justifyContent={isEditMode ? "flex-end" : "space-between"}
          >
            {!isEditMode && (
              <Button
                variant="outlined"
                onClick={backButtonHandler}
                disabled={isSubmitting}
                startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
            )}
            <Box sx={styles.formActions.right}>
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
                startIcon={isEditMode ? null : <AddIcon />}
              >
                {submitBtnText}
              </Button>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CityForm;
