import { createContext } from "react";
import { FormContextType } from "./types";

export const FormContext = createContext<FormContextType>({
  formName: "FORM_NAME",
  validationRun: "onBlur",
  resetFieldOnUnmount: true,
  initialValues: {},
  formState: {},
  defaultArrayFieldValues: {},
});
FormContext.displayName = "FormContext";
