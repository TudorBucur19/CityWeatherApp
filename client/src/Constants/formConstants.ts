import type { CityTextFormFields, FieldNameOptions } from "../types/components";

export const cityFormFields = (
  shouldDisplay: boolean
): CityTextFormFields[] => [
  {
    label: "City Name",
    type: "text",
    name: "name" as FieldNameOptions,
    fullWidth: true,
    required: true,
    display: shouldDisplay,
  },
  {
    label: "State / Sub-region",
    type: "text",
    name: "state" as FieldNameOptions,
    fullWidth: true,
    required: true,
    display: shouldDisplay,
  },
  {
    label: "Country",
    type: "text",
    name: "country" as FieldNameOptions,
    fullWidth: true,
    required: true,
    display: shouldDisplay,
  },
  {
    label: "Date Established",
    type: "date",
    name: "date_established" as FieldNameOptions,
    fullWidth: true,
    required: true,
    display: true,
  },
  {
    label: "Estimated Population",
    type: "number",
    name: "estimated_population" as FieldNameOptions,
    fullWidth: true,
    required: true,
    display: true,
  },
];

{
  /* <TextField
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

          <TextField
            label="Date Established"
            type="date"
            fullWidth
            {...register("date_established")}
          />

          <TextField
            label="Estimated Population"
            type="number"
            fullWidth
            {...register("estimated_population")}
          /> */
}
