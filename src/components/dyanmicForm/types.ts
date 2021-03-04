import { GridSize, GridSpacing, GridDirection } from "@material-ui/core/Grid";
import {
  AllTextFieldProps,
  AllSelectFieldProps,
  AllCheckboxGroupProps,
  AllCheckboxProps,
  AllDatePickerProps,
  AllDateTimePickerProps,
  AllTimePickerProps,
  AllRadioProps,
  AllRatingProps,
  AllSliderProps,
  AllSwitchGroupProps,
  AllSwitchProps,
  AllNumberFormatProps,
  AllPasswordFieldProps,
  AllSpacerProps,
  AllToggleButtonGroupProps,
  AllInputMaskProps,
  AllAutocompleteProps,
  ArrayFieldProps,
  AllTextareaAutosizeFieldProps,
  AllHiddenFieldProps,
  AllTypographyFieldProps,
} from "./typesFields";
import {
  TextFieldPropsOptional,
  SelectPropsOptional,
  CheckboxGroupPropsOptional,
  CheckboxPropsOptional,
  DatePickerPropsOptional,
  DateTimePickerPropsOptional,
  TimePickerPropsOptional,
  RadioPropsOptional,
  RatingPropsOptional,
  SliderPropsOptional,
  SwitchPropsOptional,
  SwitchGroupPropsOptional,
  NumberFormatPropsOptional,
  PasswordFieldPropsOptional,
  ToggleButtonGroupPropsOptional,
  InputMaskPropsOptional,
  AutocompletePropsOptional,
  TextareaAutosizeFieldPropsOptional,
} from "./typesFields";
import { Merge } from "components/common/types";
import { InitialValuesType, SubmitFnType } from "packages/form";

export interface FormRenderConfigType {
  ordering: "auto" | "sequence";
  renderType: "simple" | "tabs" | "stepper" | "accordian"; //implimentation pending
  labels?: {
    next?: string;
    prev?: string;
    complete?: string;
  };
  groups?: { [key: string]: string };
  gridConfig: {
    item?: {
      xs?: GridSize;
      sm?: GridSize;
      md?: GridSize;
      spacing?: GridSpacing;
    };
    container: {
      direction?: GridDirection;
      spacing?: GridSpacing;
    };
  };
}

export interface UserFlowType {
  componentName: string;
  sequence: number;
}

export interface FormMetaDataType {
  name: string;
  label: string;
  resetFieldOnUmnount: boolean;
  validationRun: "onBlur" | "onChange" | "all";
  render: FormRenderConfigType;
  componentProps: ComponentTypeProps;
  formState?: any;
  //very specific need better api and remove from metaData -future TODO
  flow?: UserFlowType[];
  submitAction?: string;
  refID?: string | number; //remove it and make it part of formState
  confirmationBox?: {
    name: string;
    label: string;
  };
}

export interface ComponentTypeProps {
  textField?: TextFieldPropsOptional;
  select?: SelectPropsOptional;
  checkbox?: CheckboxPropsOptional;
  checkboxGroup?: CheckboxGroupPropsOptional;
  datetimePicker?: DateTimePickerPropsOptional;
  datePicker?: DatePickerPropsOptional;
  timePicker?: TimePickerPropsOptional;
  radio?: RadioPropsOptional;
  rating?: RatingPropsOptional;
  slider?: SliderPropsOptional;
  switch?: SwitchPropsOptional;
  switchGroup?: SwitchGroupPropsOptional;
  numberFormat?: NumberFormatPropsOptional;
  passwordField?: PasswordFieldPropsOptional;
  toggleButtonGroup?: ToggleButtonGroupPropsOptional;
  inputMask?: InputMaskPropsOptional;
  autocomplete?: AutocompletePropsOptional;
  textarea?: TextareaAutosizeFieldPropsOptional;
}

export interface MetaDataType {
  form: FormMetaDataType;
  fields: FieldMetaDataType[];
}

//when you change a type _fields here also change it in common ArrayFields component

export type FieldMetaDataTypeX =
  | AllTextFieldProps
  | AllSelectFieldProps
  | AllCheckboxGroupProps
  | AllCheckboxProps
  | AllDatePickerProps
  | AllDateTimePickerProps
  | AllTimePickerProps
  | AllRadioProps
  | AllRatingProps
  | AllSliderProps
  | AllSwitchGroupProps
  | AllSwitchProps
  | AllNumberFormatProps
  | AllPasswordFieldProps
  | AllToggleButtonGroupProps
  | AllSpacerProps
  | AllInputMaskProps
  | AllAutocompleteProps
  | AllTextareaAutosizeFieldProps
  | AllTypographyFieldProps
  | AllHiddenFieldProps
  | ArrayFieldProps;

export type FieldMetaDataType = Merge<
  FieldMetaDataTypeX,
  { template?: FieldMetaDataType[] }
>;

/* Yup Rules Types*/
export interface YupSchemaMetaDataType {
  type: "string" | "number" | "boolean" | "date" | "array";
  rules?: YupRulesType[];
}

interface YupRulesType {
  name: string;
  params: any[];
}

export interface RenderedFieldsType {
  fields: JSX.Element[];
  sequence: number[];
  fieldNames: string[];
  excluded?: boolean;
}

export interface GroupWiseRenderedFieldsType {
  [key: string]: RenderedFieldsType;
}

export interface RouterState {
  formCode?: string;
  productCode?: string;
}

//This is to create custom types to extend base types

export type FieldMetaDataTypeOptional =
  | TextFieldPropsOptional
  | SelectPropsOptional
  | CheckboxPropsOptional
  | CheckboxGroupPropsOptional
  | DateTimePickerPropsOptional
  | DatePickerPropsOptional
  | TimePickerPropsOptional
  | RadioPropsOptional
  | RatingPropsOptional
  | SliderPropsOptional
  | SwitchPropsOptional
  | SwitchGroupPropsOptional
  | NumberFormatPropsOptional
  | PasswordFieldPropsOptional
  | ToggleButtonGroupPropsOptional
  | InputMaskPropsOptional
  | AutocompletePropsOptional
  | TextareaAutosizeFieldPropsOptional;

export type ExtendedFieldMetaDataTypeOptional = {
  [key: string]: FieldMetaDataTypeOptional;
};

export interface RenderFunctionType {
  (
    fieldObj: FieldMetaDataType,
    formRenderConfig: FormRenderConfigType,
    formName: string,
    componentProps?: ComponentTypeProps
  ): JSX.Element;
}

export interface FormWrapperProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  onSubmitHandler: SubmitFnType;
  hidden?: boolean;
  displayMode?: "new" | "view" | "edit";
  disableGroupExclude?: boolean;
  disableGroupErrorDetection?: boolean;
}

export interface FormProps {
  fields: GroupWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  formName: string;
  disableGroupExclude?: boolean;
  disableGroupErrorDetection?: boolean;
  handleSubmitPartial?: any;
  handleSubmit?: any;
}
