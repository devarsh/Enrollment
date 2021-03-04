import {
  AttachMethodArrayType,
  attachMethodsToMetaData as _attachMethodsToMetaData,
  singletonFunctionRegisrationFactory,
} from "components/utils";
import { GridMetaDataType } from "../types";

const optionsMethodNotFound = (fieldKey) => () => {
  console.log(`no method found for options at ${fieldKey}`);
  return [{ label: "Oops error occured", value: "" }];
};
const validateMethodNotFound = (fieldKey) => () => {
  console.log(`no method found for validation at ${fieldKey}`);
  return "";
};

const defaultFieldsToAttachMethods: AttachMethodArrayType[] = [
  [/^columns.*.options$/, optionsMethodNotFound],
  [/^columns.*.validate$/, validateMethodNotFound],
];

//do not walk for arrayFields _fields as well we will run it seperately
const skipWalkingForKeys = ["validate"];

export const attachMethodsToMetaData = (metaData: GridMetaDataType) => {
  return _attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory,
    defaultFieldsToAttachMethods,
    skipWalkingForKeys
  );
};
