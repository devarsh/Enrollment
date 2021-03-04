import { YupSchemaMetaDataType } from "./types";
import { Merge, Optional } from "components/common/types";
import { TextFieldProps } from "components/common/textField";
import { SelectProps } from "components/common/select";
import { CheckboxProps, CheckboxGroupProps } from "components/common/checkbox";
import {
  DatePickerProps,
  DateTimePickerProps,
  TimePickerProps,
} from "components/common/datetime";
import { RadioProps } from "components/common/radio";
import { RatingProps } from "components/common/rating";
import { SliderProps } from "components/common/slider";
import { SwitchGroupProps, SwitchProps } from "components/common/switch";
import { SpacerProps } from "components/common/spacer";
import { ToggleButtonGroupProps } from "components/common/toggleButtonGroup";
import { AutocompleteProps } from "components/common/autocomplete";
import { NumberFormatProps } from "components/derived/numberFormat";
import { PasswordFieldProps } from "components/derived/passwordField";
import { InputMaskProps } from "components/derived/inputMask";
import { ValidateFnType, shouldExcludeFnType } from "packages/form";
import { CustomRuleType } from "components/utils";
import { ArrayField2Props } from "components/common/arrayField";
import { TextareaAutosizeFieldProps } from "components/common/textarea";
import { TypographyProps } from "components/common/typograhpy";
import { HiddenFieldProps } from "components/common/hidden";
export interface FieldRenderProps<T> {
  componentType: T;
  group?: number;
  sequence?: number;
}

export interface FieldMetaData<T> {
  defaultValue?: any;
  schemaValidation?: YupSchemaMetaDataType;
  render: FieldRenderProps<T>;
  //added these to support multiple types in metaData - extending original type.
  //BaseType is always function
  validate?: typeof ValidateFnType | CustomRuleType | string;
  shouldExclude?:
    | typeof shouldExcludeFnType
    | CustomRuleType
    | Boolean
    | string;
  isReadOnly?: typeof shouldExcludeFnType | CustomRuleType | Boolean | string;
}

export type Omitted<T> = Omit<T, "fieldKey" | "enableGrid">;

export type AllAutocompleteProps = Merge<
  Omitted<AutocompleteProps>,
  FieldMetaData<"autocomplete">
>;

export type AutocompletePropsOptional = Optional<AllAutocompleteProps>;

export type AllSpacerProps = Merge<SpacerProps, FieldMetaData<"spacer">>;

export type AllInputMaskProps = Merge<
  Omitted<InputMaskProps>,
  FieldMetaData<"inputMask">
>;
export type InputMaskPropsOptional = Optional<AllInputMaskProps>;

export type AllToggleButtonGroupProps = Merge<
  Omitted<ToggleButtonGroupProps>,
  FieldMetaData<"toggleButtonGroup">
>;
export type ToggleButtonGroupPropsOptional = Optional<AllToggleButtonGroupProps>;

export type AllNumberFormatProps = Merge<
  Omitted<NumberFormatProps>,
  FieldMetaData<"numberFormat">
>;

export type NumberFormatPropsOptional = Optional<AllNumberFormatProps>;

export type AllPasswordFieldProps = Merge<
  Omitted<PasswordFieldProps>,
  FieldMetaData<"passwordField">
>;

export type PasswordFieldPropsOptional = Optional<AllPasswordFieldProps>;

export type AllCheckboxProps = Merge<
  Omitted<CheckboxProps>,
  FieldMetaData<"checkbox">
>;
export type AllCheckboxGroupProps = Merge<
  Omitted<CheckboxGroupProps>,
  FieldMetaData<"checkboxGroup">
>;
export type CheckboxPropsOptional = Optional<AllCheckboxProps>;
export type CheckboxGroupPropsOptional = Optional<AllCheckboxGroupProps>;

export type AllDatePickerProps = Merge<
  Omitted<DatePickerProps>,
  FieldMetaData<"datePicker">
>;
export type AllDateTimePickerProps = Merge<
  Omitted<DateTimePickerProps>,
  FieldMetaData<"datetimePicker">
>;
export type AllTimePickerProps = Merge<
  Omitted<TimePickerProps>,
  FieldMetaData<"timePicker">
>;
export type DatePickerPropsOptional = Optional<AllDatePickerProps>;
export type DateTimePickerPropsOptional = Optional<AllDateTimePickerProps>;
export type TimePickerPropsOptional = Optional<AllTimePickerProps>;

export type AllRadioProps = Merge<FieldMetaData<"radio">, Omitted<RadioProps>>;
export type RadioPropsOptional = Optional<AllRadioProps>;

export type AllRatingProps = Merge<
  Omitted<RatingProps>,
  FieldMetaData<"rating">
>;
export type RatingPropsOptional = Optional<AllRatingProps>;

export type AllSelectFieldProps = Merge<
  Omitted<SelectProps>,
  FieldMetaData<"select">
>;
export type SelectPropsOptional = Optional<AllSelectFieldProps>;

export type AllSliderProps = Merge<
  Omitted<SliderProps>,
  FieldMetaData<"slider">
>;
export type SliderPropsOptional = Optional<AllSliderProps>;

export type AllSwitchProps = Merge<
  Omitted<SwitchProps>,
  FieldMetaData<"switch">
>;
export type AllSwitchGroupProps = Merge<
  SwitchGroupProps,
  FieldMetaData<"switchGroup">
>;
export type SwitchPropsOptional = Optional<AllSwitchProps>;
export type SwitchGroupPropsOptional = Optional<AllSwitchGroupProps>;

export type AllTextFieldProps = Merge<
  Omitted<TextFieldProps>,
  FieldMetaData<"textField">
>;
export type TextFieldPropsOptional = Optional<AllTextFieldProps>;

export type ArrayFieldProps = Merge<
  Omitted<ArrayField2Props>,
  FieldMetaData<"arrayField">
>;

export type AllTextareaAutosizeFieldProps = Merge<
  Omitted<TextareaAutosizeFieldProps>,
  FieldMetaData<"textarea">
>;

export type TextareaAutosizeFieldPropsOptional = Optional<AllTextFieldProps>;

export type AllHiddenFieldProps = Merge<
  Omitted<HiddenFieldProps>,
  FieldMetaData<"hidden">
>;

export type AllTypographyFieldProps = Merge<
  Omitted<TypographyProps>,
  FieldMetaData<"typography">
>;
