import * as yup from "yup";
import { FieldMetaDataType } from "../types";

//construct Yup schema from metaData

export const constructYupSchema = (fields: FieldMetaDataType[]) => {
  if (!Array.isArray(fields)) {
    return yup.object().shape({});
  }
  let schema = {};
  const schemaObject = fields.reduce(parseSchema, schema);
  const yupScheamObject = yup.object().shape(schemaObject);
  return yupScheamObject;
};

const parseSchema = (schema, fieldObj: FieldMetaDataType) => {
  const { name, schemaValidation, render } = fieldObj;
  //for ArrayField support
  if (render.componentType === "arrayField") {
    //@ts-ignore
    let result = constructYupSchema(fieldObj._fields);
    let validator = yup.array().of(result);
    schema[name] = validator;
    return schema;
  }

  if (schemaValidation === undefined) {
    return schema;
  }
  const { type, rules } = schemaValidation;
  //check if type exist in yup
  if (!yup[type]) {
    return schema;
  }

  if (!Array.isArray(rules)) {
    return schema;
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
  schema[name] = validator;
  return schema;
};

/*
//if fieldType is array pass template object to makeSchemaFromTemplate and attached it to nested array obj
if (type === "array") {
    if (["string", "number", "boolean", "date"].indexOf(arrayType ?? "") > -1) {
      //@ts-ignore
      let arrayOFTypeSchema = yup[type]()["of"](arrayType);
      if (!Array.isArray(rules)) {
        return schema;
      }
      rules.forEach((rule) => {
        const { params, name } = rule;
        if (!arrayOFTypeSchema[name]) {
          return;
        }
        arrayOFTypeSchema = arrayOFTypeSchema[name](...params);
      });
      schema[name] = arrayOFTypeSchema;
      return schema;
    } else {
      const { template = [] } = fieldObj;
      const nestedschema = constructYupSchema(template);
      const arrayOFNestedSchema = yup[type]()["of"](nestedschema);
      schema[name] = arrayOFNestedSchema;
      return schema;
    }
  } else {
*/
