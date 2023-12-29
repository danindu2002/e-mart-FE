import { SxProps, TextField, InputAdornment } from "@mui/material";

/**
 * Renders a MUI TextField component with customizable properties for form input
 * *props used to customize the alert
 * @label - Label for the text field.
 * @name - Name for the text field in the form.
 * @placeholder - Optional placeholder text for the text field.
 * @type - Input type of the field.
 * * note: Input type is "text" by default.
 * @fullWidth - Flag indicating whether the text field should take full width (default is true).
 * @multiline - Flag indicating whether the text field is multiline (default is false).
 * @error - Flag indicating whether there is an error in the text field.
 * @helperText - Helper text to display below the text field.
 * @register - Form registration function from react-hook-form.
 * @sx - Styling object.
 * @value - Value of the text field.
 * @onChange - Optional callback function triggered on text field value change.
 */

interface FormTextFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  error?: boolean;
  helperText?: string;
  register: any;
  sx: SxProps;
  value?: any;
  onChange?: any;
  disabled?: boolean;
  startAdornment?: React.ReactNode; // New prop for start adornment
}

export default function FormTextField({
  label,
  name,
  placeholder,
  type = "text",
  fullWidth = true,
  multiline = false,
  error,
  helperText,
  register,
  sx,
  onChange,
  disabled = false,
  startAdornment, // New prop
}: FormTextFieldProps) {
  return (
    <TextField
      {...register(name)}
      placeholder={placeholder}
      label={label}
      type={type}
      fullWidth={fullWidth}
      multiline={multiline}
      size="small"
      error={error}
      helperText={helperText}
      onChange={onChange}
      // autoComplete="off"
      disabled={disabled}
      sx={sx}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
      }}
    />
  );
}
