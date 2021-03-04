import { FC, useCallback, useState } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormLabel, { FormLabelProps } from "@material-ui/core/FormLabel";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";

import Radio, { RadioProps } from "@material-ui/core/Radio";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import Grid, { GridProps } from "@material-ui/core/Grid";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Merge, OptionsProps } from "../types";
import { getLabelFromValues, useOptionsFetcher } from "../utils";

interface extendedFiledProps extends UseFieldHookProps {
  options: OptionsProps[];
  _optionsKey?: string;
  disableCaching?: boolean;
  label: string;
}

type MyRadioMixedProps = Merge<RadioProps, extendedFiledProps>;

interface MyCheckboxExtendedProps {
  FormLabelProps?: FormLabelProps;
  RadioGroupProps?: RadioGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  GridProps?: GridProps;
  enableGrid: boolean;
  CircularProgressProps?: CircularProgressProps;
}

export type MyRadioAllProps = Merge<MyRadioMixedProps, MyCheckboxExtendedProps>;

const MyRadio: FC<MyRadioAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  label,
  options,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
  FormHelperTextProps,
  FormControlLabelProps,
  GridProps,
  enableGrid,
  runValidationOnDependentFieldsChange,
  CircularProgressProps,
  _optionsKey,
  disableCaching,
  ...others
}) => {
  const {
    formState,
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    fieldKey,
    name,
    excluded,
    readOnly,
    dependentValues,
    incomingMessage,
    runValidation,
    whenToRunValidation,
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
  const [_options, setOptions] = useState<OptionsProps[]>([]);

  const getLabelFromValuesForOptions = useCallback(
    (values) => getLabelFromValues(_options)(values),
    [_options]
  );

  const handleChangeInterceptor = useCallback(
    (e) => {
      const value = typeof e === "object" ? e?.target?.value ?? "" : e;
      let result = getLabelFromValuesForOptions(value);
      handleChange(e, result[0] as any);
    },
    [handleChange, getLabelFromValuesForOptions]
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

  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
  const radios = _options.map((radio) => (
    <FormControlLabel
      {...FormControlLabelProps}
      control={
        <Radio
          {...others}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
        />
      }
      key={radio.value}
      label={radio.label}
      value={radio.value}
    />
  ));
  const result = (
    // @ts-ignore
    <FormControl
      {...FormControlProps}
      key={fieldKey}
      component="fieldset"
      disabled={isSubmitting}
      error={!isSubmitting && isError}
      onBlur={handleBlur}
    >
      <FormLabel {...FormLabelProps} component="label">
        {label}
      </FormLabel>
      <RadioGroup
        {...RadioGroupProps}
        onChange={handleChangeInterceptor}
        name={name}
        value={value}
      >
        {loadingOptions ? (
          <InputAdornment position="end">
            <CircularProgress
              color="primary"
              variant="indeterminate"
              {...CircularProgressProps}
            />
          </InputAdornment>
        ) : (
          radios
        )}
      </RadioGroup>
      {!isSubmitting && isError ? (
        <FormHelperText {...FormHelperTextProps}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );

  if (Boolean(enableGrid)) {
    return (
      <Grid {...GridProps} key={fieldKey}>
        {result}
      </Grid>
    );
  } else {
    return result;
  }
};

export default MyRadio;
