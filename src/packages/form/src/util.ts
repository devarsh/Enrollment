import { clone, toPath } from "lodash-es";

import * as yup from "yup";
import { FormFieldAtomType } from "./types";

//Copied the following from Formik library

export const isString = (obj: any): obj is string =>
  Object.prototype.toString.call(obj) === "[object String]";

export const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === "object";

export const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

export function getIn(
  obj: any,
  key: string | string[],
  def?: any,
  p: number = 0
) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj === undefined ? def : obj;
}

export function setIn(obj: any, path: string, value: any): any {
  let res: any = clone(obj); // this keeps inheritance when obj is a class
  let resVal: any = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];
    let currentObj: any = getIn(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = clone(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  // If the path array has a single element, the loop did not run.
  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  if (i === 0 && value === undefined) {
    delete res[pathArray[i]];
  }

  return res;
}

const validationConfig = {
  abortEarly: false,
  strict: true,
};

export const yupValidationHelper = (
  schema: yup.AnyObjectSchema | yup.StringSchema<any> | yup.NumberSchema<any>
) => async (field: FormFieldAtomType) => {
  const { value } = field;
  try {
    await schema.validate(value, validationConfig);
    return null;
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      return e.errors[0];
    }
    return e.message;
  }
};

export const yupReachAndValidate = (
  schema: yup.AnyObjectSchema | undefined,
  path: string
) => {
  if (typeof schema === "object") {
    try {
      let fieldSchema = yup.reach(schema, path);
      return async (field: FormFieldAtomType) => {
        return await yupValidationHelper(fieldSchema)(field);
      };
    } catch (e) {
      return undefined;
    }
  } else {
    return undefined;
  }
};
