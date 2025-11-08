import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { ICustomInput } from "../types";
import type { FC } from "react";

const CustomInput: FC<ICustomInput> = ({
  label,
  type,
  name,
  fullWidth = true,
  display = true,
}) => {
  const { register } = useFormContext();
  if (!display) return null;

  return (
    <TextField
      label={label}
      type={type}
      fullWidth={fullWidth}
      {...register(name)}
    />
  );
};

export default CustomInput;
