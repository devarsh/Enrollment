import { FC, useState } from "react";
import { SelectProps } from "@material-ui/core/Select";
import { TextFieldProps } from "@material-ui/core/TextField";
import { TextField } from "components/styledComponent";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Checkbox } from "components/styledComponent/checkbox";
import { OptionsProps, Merge, OptionsFn } from "../types";
import { getLabelFromValues, useOptionsFetcherSimple } from "../utils";

interface MySelectExtendedProps {
  MenuItemProps?: MenuItemProps;
  SelectProps?: SelectProps;
  CircularProgressProps?: CircularProgressProps;
  options?: OptionsProps[] | OptionsFn;
  _optionsKey?: string;
  multiple?: boolean;
  showCheckbox?: boolean;
  handleChange?: any;
  handleBlur?: any;
  error?: any;
  touched?: any;
  loading?: boolean;
  readOnly?: boolean;
  value?: any;
  disableCaching?: boolean;
  optionsProps?: any;
}
type MySelectProps = Merge<TextFieldProps, MySelectExtendedProps>;

export const SelectRenderOnly: FC<MySelectProps> = ({
  options,
  MenuItemProps,
  SelectProps,
  multiple,
  showCheckbox,
  InputProps,
  inputProps,
  CircularProgressProps,
  handleBlur,
  handleChange,
  error,
  touched,
  value,
  loading,
  readOnly,
  _optionsKey,
  disableCaching,
  optionsProps,
  ...others
}) => {
  const [_options, setOptions] = useState<OptionsProps[]>([]);
  const isTouched = Boolean(touched);
  const isError = isTouched && Boolean(error);
  const { loadingOptions } = useOptionsFetcherSimple(
    options,
    setOptions,
    _optionsKey,
    disableCaching,
    optionsProps
  );
  const menuItems = _options.map((menuItem, index) => {
    return (
      <MenuItem
        {...MenuItemProps}
        //keep button value to true else keyboard navigation for select will stop working
        button={true}
        key={menuItem.value ?? index}
        value={menuItem.value}
        disabled={menuItem.disabled}
      >
        {showCheckbox ? (
          <Checkbox
            checked={
              Boolean(multiple)
                ? Array.isArray(value) && value.indexOf(menuItem.value) >= 0
                : value === menuItem.value
            }
          />
        ) : null}
        {menuItem.label}
      </MenuItem>
    );
  });
  return (
    <TextField
      {...others}
      select={true}
      value={multiple && !Array.isArray(value) ? [value] : value}
      error={isError}
      helperText={isError ? error : null}
      onChange={handleChange}
      onBlur={handleBlur}
      SelectProps={{
        ...SelectProps,
        native: false,
        multiple: multiple,
        renderValue: multiple ? getLabelFromValues(_options, true) : undefined,
        //@ts-ignore
      }}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment:
          loading || loadingOptions ? (
            <InputAdornment position="end">
              <CircularProgress
                color="primary"
                variant="indeterminate"
                {...CircularProgressProps}
              />
            </InputAdornment>
          ) : null,
        ...InputProps,
      }}
      inputProps={{
        readOnly: readOnly,
        tabIndex: readOnly ? -1 : undefined,
        ...inputProps,
      }}
    >
      {menuItems}
    </TextField>
  );
};
