import * as yup from "yup";
import { GridColumnType, YupSchemaMetaDataType } from "../types";

const validationConfig = {
  abortEarly: false,
  strict: true,
};

export const attachYupSchemaValidator = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { schemaValidation, ...others } = column;
      return {
        ...others,
        schemaValidation: parseYupSchemaAndAttachMethod(schemaValidation),
      };
    });
  }
  return [];
};

const parseYupSchemaAndAttachMethod = (
  schemaValidation?: YupSchemaMetaDataType
) => {
  if (schemaValidation === undefined) {
    return undefined;
  }
  const { type, rules } = schemaValidation;
  //check if type exist in yup
  if (!yup[type]) {
    return undefined;
  }

  if (!Array.isArray(rules)) {
    return undefined;
  }
  //@ts-ignore
  let validator = yup[type]();
  rules.forEach((rule) => {
    const { params, name } = rule;
    if (!validator[name]) {
      return;
    }
    validator = validator[name](...params);
  });

  return attachYupValidator(validator);
};

const attachYupValidator = (
  validator:
    | yup.DateSchema
    | yup.NumberSchema
    | yup.StringSchema
    | yup.BooleanSchema
) => async (value: number | string | boolean | Date) => {
  try {
    await validator.validate(value, validationConfig);
    return null;
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      return e.errors[0];
    }
    return e.message;
  }
};
