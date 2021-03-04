import { FieldMetaDataType } from "../types";
import { InitialValuesType } from "packages/form";

export const attachValuesToMetaData = (
  fields: FieldMetaDataType[],
  formData: InitialValuesType
) => {
  if (!Array.isArray(fields)) {
    return [];
  }
  return fields.map((one) => {
    const { name, ...others } = one;
    const value = formData[name] ?? "N/A";
    return { ...others, name, defaultValue: value };
  });
};
