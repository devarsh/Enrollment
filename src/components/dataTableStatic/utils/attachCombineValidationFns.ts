import { GridColumnType } from "../types";

export const combineAndRunValidation = (schemaValidation, validation) => async (
  value
) => {
  let result;
  if (typeof schemaValidation === "function") {
    result = await schemaValidation(value);
    if (Boolean(result)) {
      return result;
    }
  }
  if (typeof validation === "function") {
    result = await validation(value);
    if (Boolean(result)) {
      return result;
    }
  }
  return "";
};

export const attachcombinedValidationFns = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { schemaValidation, validation, ...others } = column;
      return {
        ...others,
        validation: combineAndRunValidation(schemaValidation, validation),
      };
    });
  }
  return [];
};
