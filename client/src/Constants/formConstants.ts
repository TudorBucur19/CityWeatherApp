import type { CityTextFormFields, FieldNameOptions } from "../types/cityTypes";

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
