import {
  MetaDataType,
  ExtendedFieldMetaDataTypeOptional,
  FieldMetaDataType,
} from "../types";
export const extendFieldTypes = (
  metaData: MetaDataType,
  extendedTypes: ExtendedFieldMetaDataTypeOptional
) => {
  const newMetaDataFields = metaData.fields.map((one) => {
    const extendedType = extendedTypes[one.render.componentType];
    //exclude the following types from extending
    if (typeof extendedType === "object") {
      const {
        defaultValue,
        render,
        validate,
        shouldExclude,
        isReadOnly,
        name,
        validationRun,
        dependentFields,
        postValidationSetCrossFieldValues,
        runPostValidationHookAlways,
        ...others
      } = extendedType;
      const result = Object.assign({}, one, others) as FieldMetaDataType;
      if (result && result.render && result.render.componentType) {
        //@ts-ignore
        result.render.componentType = extendedType.render?.componentType;
      }
      return result;
    }
    return one;
  });
  return {
    form: metaData.form,
    fields: [...newMetaDataFields],
  } as MetaDataType;
};
