import * as yup from "yup";
import { MetaDataType } from "../types";

const form = yup.object().shape({
  name: yup.string().required(),
  label: yup.string().required(),
  render: yup.object().shape({
    ordering: yup.string().required(),
    renderType: yup.string().required(),
    groups: yup.object().required(),
  }),
  submitAction: yup.string().required(),
});

const field = yup.array().of(
  yup.object().shape({
    name: yup.string().required(),
    label: yup.string().required(),
    render: yup.object().shape({
      componentType: yup.string().required(),
      group: yup.number().required(),
    }),
    sequence: yup.number(),
    GridProps: yup.object().shape({
      xs: yup.number().required(),
      md: yup.number().required(),
      sm: yup.number().required(),
    }),
  })
);

const metaDataChecker = yup.object().shape({
  form: form,
  fields: field,
});

export const validateMetaData = (metaData: MetaDataType) => {
  try {
    metaDataChecker.validateSync(metaData, {
      abortEarly: false,
      strict: false,
      stripUnknown: false,
    });
    return true;
  } catch (e) {
    if (process.env.REACT_APP_DEBUG_MODE === "true") {
      console.log(e);
    }
    return false;
  }
};

export const isMetaDataValid = (metaData) => {
  if (Boolean(metaData) && typeof metaData === "object") {
    const { form, fields } = metaData;
    if (
      Array.isArray(fields) &&
      fields.length > 0 &&
      typeof form === "object"
    ) {
      return validateMetaData(metaData);
    }
  }
  return false;
};
