import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import Grid, { GridProps } from "@material-ui/core/Grid";
import ToggleButton, { ToggleButtonProps } from "@material-ui/lab/ToggleButton";
import { ToggleButtonGroupProps } from "@material-ui/lab/ToggleButtonGroup";
import { ToggleButtonGroup } from "components/styledComponent/toggleButtonGroup";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormLabel, { FormLabelProps } from "@material-ui/core/FormLabel";
import { Merge } from "../types";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";

interface CustomProps {
  iconName?: "business" | "person";
  label: string;
  value: any;
}

interface extendedFiledProps extends UseFieldHookProps {
  label: string;
  options: CustomProps[];
}

type MyToggleMixedProps = Merge<ToggleButtonGroupProps, extendedFiledProps>;

interface MyToggleExtendedProps {
  ToggleButtonProps?: ToggleButtonProps;
  GridProps?: GridProps;
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
  enableGrid: boolean;
}

export type MyAllToggleButtonGroupProps = Merge<
  MyToggleMixedProps,
  MyToggleExtendedProps
>;

const MyToggleButtonGroupProps: FC<MyAllToggleButtonGroupProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runValidationOnDependentFieldsChange,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  options,
  ToggleButtonProps,
  GridProps,
  enableGrid,
  label,
  //@ts-ignore
  isFieldFocused,
  ...others
}) => {
  const {
    value,
    handleChange,
    handleBlur,
    isSubmitting,
    fieldKey,
    excluded,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
    dependentFields,
    validate,
    validationRun,
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    runValidationOnDependentFieldsChange,
    isReadOnly,
    shouldExclude,
  });
  if (excluded) {
    return null;
  }

  const toggleButtons = options.map((one) => (
    <ToggleButton
      {...ToggleButtonProps}
      key={one.value}
      value={one.value}
      disabled={isSubmitting}
    >
      {one.iconName === "business" ? (
        <BusinessIcon />
      ) : one.iconName === "person" ? (
        <PersonIcon />
      ) : null}
      {/*need to change this from span to typography */}
      <span>{one.label}</span>
    </ToggleButton>
  ));
  const result = (
    <FormControl disabled={isSubmitting}>
      <FormLabel>{label}</FormLabel>
      <ToggleButtonGroup
        {...others}
        value={value}
        onChange={(e, newValue) => {
          handleChange(newValue);
        }}
        onBlur={handleBlur}
      >
        {toggleButtons}
      </ToggleButtonGroup>
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

export default MyToggleButtonGroupProps;
