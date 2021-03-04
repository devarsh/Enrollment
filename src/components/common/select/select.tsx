import { FC, useEffect, useState, useRef, useCallback } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import { SelectProps } from "@material-ui/core/Select";
import { TextFieldProps } from "@material-ui/core/TextField";
import { TextField } from "components/styledComponent";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import Grid, { GridProps } from "@material-ui/core/Grid";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Checkbox } from "components/styledComponent/checkbox";
import { OptionsProps, Merge, dependentOptionsFn } from "../types";
import { getLabelFromValues, useOptionsFetcher } from "../utils";

interface extendedFieldProps extends UseFieldHookProps {
  options?: OptionsProps[] | dependentOptionsFn;
  _optionsKey?: string;
  disableCaching?: boolean;
  multiple?: boolean;
  showCheckbox?: boolean;
}
type MySelectProps = Merge<TextFieldProps, extendedFieldProps>;

interface MySelectExtendedProps {
  MenuItemProps?: MenuItemProps;
  SelectProps?: SelectProps;
  CircularProgressProps?: CircularProgressProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MySelectAllProps = Merge<MySelectProps, MySelectExtendedProps>;

const MySelect: FC<MySelectAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  options,
  MenuItemProps,
  SelectProps,
  GridProps,
  enableGrid,
  multiple,
  showCheckbox,
  //@ts-ignore
  isFieldFocused,
  InputProps,
  inputProps,
  CircularProgressProps,
  runValidationOnDependentFieldsChange,
  _optionsKey,
  disableCaching,
  ...others
}) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    runValidation,
    validationRunning,
    isSubmitting,
    fieldKey,
    name,
    dependentValues,
    excluded,
    incomingMessage,
    whenToRunValidation,
    readOnly,
    formState,
    setIncomingMessage,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
    dependentFields,
    validate,
    validationRun,
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
    runValidationOnDependentFieldsChange,
  });
  const focusRef = useRef();
  const [_options, setOptions] = useState<OptionsProps[]>([]);
  useEffect(() => {
    if (isFieldFocused) {
      setTimeout(() => {
        //@ts-ignore
        focusRef?.current?.focus?.();
      }, 1);
    }
  }, [isFieldFocused]);
  const getLabelFromValuesForOptions = useCallback(
    (values) => getLabelFromValues(_options)(values),
    [_options]
  );

  const handleChangeInterceptor = useCallback(
    (e) => {
      const value = typeof e === "object" ? e?.target?.value ?? "" : e;
      let result = getLabelFromValuesForOptions(value);
      result = multiple ? result : result[0];
      handleChange(e, result as any);
    },
    [handleChange, getLabelFromValuesForOptions, multiple]
  );
  const { loadingOptions } = useOptionsFetcher(
    formState,
    options,
    setOptions,
    handleChangeInterceptor,
    dependentValues,
    incomingMessage,
    runValidation,
    whenToRunValidation,
    _optionsKey,
    disableCaching,
    setIncomingMessage
  );

  //dont move it to top it can mess up with hooks calling mechanism, if there is another
  //hook added move this below all hook calls
  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
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
  const result = (
    <TextField
      {...others}
      select={true}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={multiple && !Array.isArray(value) ? [value] : value}
      error={!isSubmitting && isError}
      helperText={!isSubmitting && isError ? error : null}
      onChange={handleChangeInterceptor}
      onBlur={handleBlur}
      disabled={isSubmitting}
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
      inputRef={focusRef}
      InputProps={{
        endAdornment:
          validationRunning || loadingOptions ? (
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
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MySelect;
